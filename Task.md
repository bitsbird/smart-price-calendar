# overview: The current implementation of the smart calendar price should satisfy the following requirements

## Basic Requirements

### 1. Pricing Calendar Implementation

Create a calendar component that displays:

- Price of the room for the day
- Price in PMS (Property Management System)
- Currency symbol and formatting according to the hotel's locale
- Highlight price differences (positive or negative) greater or equal to 4% between the current price and the price in PMS

### 2. Calendar Navigation

- Display current month by default
- Implement previous/next month navigation
- Ensure proper date formatting according to hotel's locale

### 3. Data Fetching

- Use TanStack Query (React Query) for API calls
- Handle loading and error states appropriately

# Objectives of the task: the current implementation presents few issues that require a refactoring
- typescript is not always used correctly and may lead to type misuse
- the implementation adopted few react antipatterns that may lead to unexpected failures in production
- the unit tests are missing

# execution of the task: following the guidelines provided, define a refactoring strategy.
# out of scope: the scope of the task is not renaming files, variables or making it nicer. Focus on the issues that may raise bugs.