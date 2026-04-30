# Refactor Plan: Calendar Test Baseline

## Scope
- Execute `tasks/task_test.md` as a test-only change.
- Do not modify production logic in `client/calendar` unless a minimal test selector is required.
- Stop after planning and wait for `[CONFIRM]` before writing tests.

## Research Findings
- `SmartCalendar.tsx` does not exist; active calendar entry component appears to be `client/calendar/components/Calendar.tsx`.
- Vitest config is present and uses `jsdom`; setup file path should target a non-`src` location in this repo.
- `test/setup.ts` is currently missing and must be created before implementation.
- There are currently no existing test files in the repository.
- Calendar logic relies on hooks (`useQueryHotelPrices`, `useQueryHotelSettings`) and context (`SettingsProvider`), so unit tests will use deterministic `vi.mock` hook outputs and provider wrappers where needed.

## Test Strategy
- Framework: Vitest + React Testing Library + JSDOM.
- Pattern: Arrange-Act-Assert.
- Determinism: mock hooks and avoid real network requests.
- Focus: document current behavior (rendering, pricing logic, month navigation, error display).

## Planned Test Files and Cases

### 1) `client/calendar/components/Calendar.test.tsx`
- renders month selector and room selector with mocked hotel data.
- passes filtered calendar data into `CalendarGrid` after default month and reference room are selected.
- updates selected month when nav invokes `onChangeMonth`.
- updates selected room type when room selector changes value.

### 2) `client/calendar/components/CalendarNav.test.tsx`
- renders select with current month value.
- clicking next button calls `onChangeMonth` with the next month.
- clicking previous button calls `onChangeMonth` with the previous month.
- does not call `onChangeMonth` when clicking previous on first month.
- does not call `onChangeMonth` when clicking next on last month.

### 3) `client/calendar/components/CalendarItemPrices.test.tsx`
- renders formatted `Price` and `PricePMS` values.
- shows up-arrow state when `price > pricePMS * 1.04`.
- shows down-arrow state when `price < pricePMS * 0.96`.
- shows neutral price text without arrows when delta is within threshold.
- validates boundary behavior at exact 4% increase/decrease (no arrow at equality).

### 4) `client/calendar/components/CalendarItemPricesError.test.tsx`
- renders `Marked data is not available` for `ErrorReason.NoMarketData`.
- renders `Something went wrong` for all other error reasons.

### 5) `client/calendar/components/CalendarGridItem.test.tsx`
- renders blank grid item for `type: 'blank'`.
- renders expired item with date header for `type: 'expired'`.
- renders `CalendarItemPrices` path when `isError` is false.
- renders `CalendarItemPricesError` path when `isError` is true.

### 6) `client/calendar/components/CalendarGrid.test.tsx`
- builds a grid from expired + price + blank columns based on provided days.
- renders one `CalendarGridItem` per generated column.

### 7) `client/calendar/components/CalendarRoomSelector.test.tsx`
- renders select with room type options and selected value.
- calls `onChangeRoomType` when user selects a different room.

## Setup and Utilities (Implementation Phase)
- Create `test/setup.ts`:
  - import `@testing-library/jest-dom/vitest`.
  - add cleanup hooks if needed.
- Add dev dependencies if missing:
  - `@testing-library/react`
  - `@testing-library/jest-dom`
  - `@testing-library/user-event`
- Add npm script(s) if needed:
  - `test`: `vitest`
  - `test:run`: `vitest run`
- Add shared test helpers for:
  - provider wrapper (`SettingsProvider` and optional `QueryClientProvider` when relevant)
  - fixture factories for calendar day/room data.

## Execution Steps After Approval
1. Create missing setup and helper files for testing.
2. Implement component tests listed above (one file per component).
3. Run `npx vitest run` and fix any failing test setup/mocks (without changing business logic).
4. Share results and proceed with commit flow requested by task.

## Risks / Notes
- Some Mantine `Select` interactions can require user-event + portal handling; tests may prefer direct `onChange` interaction where appropriate.
- `Calendar.tsx` sets context values during render; tests will assert observable UI behavior rather than internal state mutation details.
