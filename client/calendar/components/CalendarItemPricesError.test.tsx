import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CalendarItemPricesError } from './CalendarItemPricesError';
import { ErrorReason } from '../types';
import { renderWithMantine } from '../../../test/renderWithMantine';

describe('CalendarItemPricesError', () => {
  it('renders no market data message for matching error reason', () => {
    renderWithMantine(<CalendarItemPricesError errorReason={ErrorReason.NoMarketData} />);

    expect(screen.getByText('Marked data is not available')).toBeInTheDocument();
  });

  it('renders generic message for other error reasons', () => {
    renderWithMantine(<CalendarItemPricesError errorReason='OTHER_ERROR' />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
