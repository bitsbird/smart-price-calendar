import { screen } from '@testing-library/react';
import { enUS } from 'date-fns/locale';
import { describe, expect, it, vi } from 'vitest';
import { Calendar } from './Calendar';
import type { PriceData, SettingsData } from '../../../types';
import { renderWithMantine } from '../../../test/renderWithMantine';

const mockSetLocale = vi.fn();
const mockSetCurrencyCode = vi.fn();

const priceData: PriceData = {
  currency: {
    symbol: '$',
    code: 'USD',
  },
  prices: {
    data: {
      '2026-04-15': {
        '1': { price: 100, price_in_pms: 98 },
        '2': { price: 120, price_in_pms: 118 },
      },
      '2026-05-01': {
        '1': { price: 130, price_in_pms: 127 },
        '2': { price: 150, price_in_pms: 148 },
      },
    },
    last_run_pricing_time: '2026-04-01T00:00:00.000Z',
  },
};

const settings: SettingsData = {
  hotel: {
    timezone: 'UTC',
    locale: 'enUS',
  },
  rooms: {
    reference: {
      id: 1,
      name: 'Standard',
    },
    derived: {
      '2': {
        name: 'Deluxe',
      },
    },
  },
};

vi.mock('../../hooks/useQueryHotelPrices', () => {
  return {
    useQueryHotelPrices: () => ({ priceData }),
  };
});

vi.mock('../../hooks/useQueryHotelSettings', () => {
  return {
    useQueryHotelSettings: () => ({ settings }),
  };
});

vi.mock('../../utils/loadDateLocale', () => {
  return {
    loadDateLocale: () => enUS,
  };
});

vi.mock('../SettingsContext', () => {
  return {
    useSettings: () => ({
      setLocale: mockSetLocale,
      setCurrencyCode: mockSetCurrencyCode,
    }),
  };
});

vi.mock('./CalendarGrid', () => {
  return {
    CalendarGrid: ({
      calendarDays,
    }: {
      calendarDays: Array<{ room?: { id: string } }>;
    }) => (
      <div data-testid='calendar-grid'>
        {calendarDays?.map((day, index) => (
          <div key={`${day.room?.id}-${index}`}>{day.room?.id}</div>
        ))}
      </div>
    ),
  };
});

vi.mock('./CalendarRoomSelector', () => {
  return {
    CalendarRoomSelector: ({
      selectedRoomType,
    }: {
      selectedRoomType: string;
    }) => <div data-testid='room-selector'>{selectedRoomType}</div>,
  };
});

vi.mock('./CalendarNav', () => {
  return {
    CalendarNav: ({
      selectedMonth,
      optionMonths,
    }: {
      selectedMonth: string;
      optionMonths: Array<{ value: string }>;
    }) => (
      <div data-testid='calendar-nav'>
        <span>{selectedMonth}</span>
        <span>{optionMonths.length}</span>
      </div>
    ),
  };
});

describe('Calendar', () => {
  it('renders title and calendar controls', () => {
    renderWithMantine(<Calendar />);

    expect(screen.getByText('room prices calendar')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-nav')).toBeInTheDocument();
    expect(screen.getByTestId('room-selector')).toBeInTheDocument();
  });

  it('sets locale and currency in settings context', () => {
    renderWithMantine(<Calendar />);

    expect(mockSetLocale).toHaveBeenCalled();
    expect(mockSetCurrencyCode).toHaveBeenCalledWith('USD');
  });

  it('renders filtered days for default reference room', () => {
    renderWithMantine(<Calendar />);

    expect(screen.getByTestId('calendar-grid')).toBeInTheDocument();
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
  });
});
