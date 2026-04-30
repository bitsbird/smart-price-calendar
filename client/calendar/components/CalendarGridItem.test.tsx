import { TZDate } from '@date-fns/tz';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SettingsProvider } from '../SettingsContext';
import { ErrorReason, type CalendarGridColumn } from '../types';
import { CalendarGridItem } from './CalendarGridItem';
import { renderWithMantine } from '../../../test/renderWithMantine';

const renderWithProvider = (item: CalendarGridColumn) => {
  return renderWithMantine(
    <SettingsProvider>
      <CalendarGridItem item={item} />
    </SettingsProvider>
  );
};

describe('CalendarGridItem', () => {
  it('renders a blank item for blank column type', () => {
    const { container } = renderWithProvider({
      key: 'blank-1',
      type: 'blank',
    });

    const hiddenElement = container.querySelector('.hidden');

    expect(hiddenElement).toBeEmptyDOMElement();
  });

  it('renders expired item content', () => {
    renderWithProvider({
      key: 'expired-1',
      type: 'expired',
      dateTZ: new TZDate('2026-04-15', 'UTC'),
    });

    expect(screen.getByText(/15/)).toBeInTheDocument();
  });

  it('renders prices when item has no error', () => {
    renderWithProvider({
      key: 'price-1',
      type: 'price',
      calendarDay: {
        dateTZ: new TZDate('2026-04-15', 'UTC'),
        monthTZ: 3,
        yearTZ: 2026,
        room: { id: '1', price: 110, pricePMS: 100, isError: false },
      },
    });

    expect(screen.getByText('Price: $110.00')).toBeInTheDocument();
    expect(screen.getByText('PricePMS: $100.00')).toBeInTheDocument();
  });

  it('renders error state when item has error', () => {
    renderWithProvider({
      key: 'price-2',
      type: 'price',
      calendarDay: {
        dateTZ: new TZDate('2026-04-16', 'UTC'),
        monthTZ: 3,
        yearTZ: 2026,
        room: {
          id: '1',
          isError: true,
          errorReason: ErrorReason.NoMarketData,
        },
      },
    });

    expect(screen.getByText('Marked data is not available')).toBeInTheDocument();
  });
});
