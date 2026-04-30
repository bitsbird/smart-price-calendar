import { TZDate } from '@date-fns/tz';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CalendarGrid } from './CalendarGrid';

vi.mock('../calendarUtils', () => {
  return {
    createExpiredDaysColumns: vi.fn(() => [
      { key: 'expired-1', type: 'expired', dateTZ: new TZDate('2026-04-01', 'UTC') },
    ]),
    createEmptyDaysColumns: vi.fn(() => [{ key: 'blank-1', type: 'blank' }]),
  };
});

vi.mock('./CalendarGridItem', () => {
  return {
    CalendarGridItem: ({ item }: { item: { key: string; type: string } }) => (
      <div data-testid='grid-item'>{`${item.type}:${item.key}`}</div>
    ),
  };
});

describe('CalendarGrid', () => {
  it('renders one item per generated grid column', () => {
    const calendarDays = [
      {
        dateTZ: new TZDate('2026-04-15', 'UTC'),
        monthTZ: 3,
        yearTZ: 2026,
        room: { id: '1', price: 100, pricePMS: 90, isError: false },
      },
    ];

    render(<CalendarGrid calendarDays={calendarDays} />);

    const items = screen.getAllByTestId('grid-item');
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('expired:expired-1');
    expect(items[1].textContent).toContain('price:2026-04-15');
    expect(items[2]).toHaveTextContent('blank:blank-1');
  });
});
