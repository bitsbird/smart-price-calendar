import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { CalendarRoomSelector } from './CalendarRoomSelector';

vi.mock('@mantine/core', () => {
  return {
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
        aria-label='room-selector'
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
    Box: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  };
});

describe('CalendarRoomSelector', () => {
  it('renders selected room and options', () => {
    render(
      <CalendarRoomSelector
        roomTypeOptions={[
          { label: 'Standard', value: '1' },
          { label: 'Deluxe', value: '2' },
        ]}
        selectedRoomType='1'
        onChangeRoomType={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('room-selector')).toHaveValue('1');
    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(screen.getByText('Deluxe')).toBeInTheDocument();
  });

  it('calls onChangeRoomType on selection change', () => {
    const onChangeRoomType = vi.fn();
    render(
      <CalendarRoomSelector
        roomTypeOptions={[
          { label: 'Standard', value: '1' },
          { label: 'Deluxe', value: '2' },
        ]}
        selectedRoomType='1'
        onChangeRoomType={onChangeRoomType}
      />,
    );

    fireEvent.change(screen.getByLabelText('room-selector'), {
      target: { value: '2' },
    });
    expect(onChangeRoomType).toHaveBeenCalledWith('2');
  });
});
