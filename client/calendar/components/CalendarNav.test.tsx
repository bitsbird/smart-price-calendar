import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { CalendarMonthOption } from '../types';
import { CalendarNav } from './CalendarNav';

vi.mock('@mantine/core', () => {
  return {
    Box: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    ActionIcon: ({
      children,
      onClick,
    }: {
      children: ReactNode;
      onClick: () => void;
    }) => <button onClick={onClick}>{children}</button>,
    Select: ({
      data,
      value,
      onChange,
    }: {
      data: Array<{ label: string; value: string }>;
      value: string;
      onChange: (value: string) => void;
    }) => (
      <select
        aria-label='month'
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {data.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    ),
  };
});

describe('CalendarNav', () => {
  const optionMonths: CalendarMonthOption[] = [
    { label: 'January 2026', value: '0:2026' },
    { label: 'February 2026', value: '1:2026' },
    { label: 'March 2026', value: '2:2026' },
  ];

  it('renders selected month value', () => {
    render(
      <CalendarNav
        optionMonths={optionMonths}
        selectedMonth='1:2026'
        onChangeMonth={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('month')).toHaveValue('1:2026');
  });

  it('moves to next month when next button is clicked', () => {
    const onChangeMonth = vi.fn();
    render(
      <CalendarNav
        optionMonths={optionMonths}
        selectedMonth='1:2026'
        onChangeMonth={onChangeMonth}
      />,
    );

    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(onChangeMonth).toHaveBeenCalledWith('2:2026');
  });

  it('moves to previous month when previous button is clicked', () => {
    const onChangeMonth = vi.fn();
    render(
      <CalendarNav
        optionMonths={optionMonths}
        selectedMonth='1:2026'
        onChangeMonth={onChangeMonth}
      />,
    );

    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onChangeMonth).toHaveBeenCalledWith('0:2026');
  });

  it('does not move back when first month is selected', () => {
    const onChangeMonth = vi.fn();
    render(
      <CalendarNav
        optionMonths={optionMonths}
        selectedMonth='0:2026'
        onChangeMonth={onChangeMonth}
      />,
    );

    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onChangeMonth).not.toHaveBeenCalled();
  });

  it('does not move forward when last month is selected', () => {
    const onChangeMonth = vi.fn();
    render(
      <CalendarNav
        optionMonths={optionMonths}
        selectedMonth='2:2026'
        onChangeMonth={onChangeMonth}
      />,
    );

    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(onChangeMonth).not.toHaveBeenCalled();
  });
});
