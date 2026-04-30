import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SettingsProvider } from '../SettingsContext';
import { CalendarItemPrices } from './CalendarItemPrices';
import { renderWithMantine } from '../../../test/renderWithMantine';

const renderWithSettings = (price: number, pricePMS: number) => {
  return renderWithMantine(
    <SettingsProvider>
      <CalendarItemPrices price={price} pricePMS={pricePMS} />
    </SettingsProvider>
  );
};

describe('CalendarItemPrices', () => {
  it('renders formatted price and PMS price', () => {
    const { container } = renderWithSettings(100, 95);

    expect(screen.getByText('Price: $100.00')).toBeInTheDocument();
    expect(screen.getByText('PricePMS: $95.00')).toBeInTheDocument();
  });

  it('shows up arrow for increases strictly above 4 percent', () => {
    const { container } = renderWithSettings(105, 100);

    expect(screen.getByText('Price: $105.00')).toBeInTheDocument();
    expect(container.querySelector('svg[class*="arrow-narrow-up"]')).toBeInTheDocument();
    expect(container.querySelector('svg[class*="arrow-narrow-down"]')).not.toBeInTheDocument();
  });

  it('shows down arrow for decreases strictly below 4 percent', () => {
    const { container } = renderWithSettings(95, 100);

    expect(screen.getByText('Price: $95.00')).toBeInTheDocument();
    expect(container.querySelector('svg[class*="arrow-narrow-down"]')).toBeInTheDocument();
    expect(container.querySelector('svg[class*="arrow-narrow-up"]')).not.toBeInTheDocument();
  });

  it('shows neutral state at exact 4 percent increase boundary', () => {
    const { container } = renderWithSettings(104, 100);

    expect(screen.getByText('Price: $104.00')).toBeInTheDocument();
    expect(container.querySelector('svg[class*="arrow-narrow-up"]')).not.toBeInTheDocument();
    expect(container.querySelector('svg[class*="arrow-narrow-down"]')).not.toBeInTheDocument();
  });

  it('shows neutral state at exact 4 percent decrease boundary', () => {
    const { container } = renderWithSettings(96, 100);

    expect(screen.getByText('Price: $96.00')).toBeInTheDocument();
    expect(container.querySelector('svg[class*="arrow-narrow-up"]')).not.toBeInTheDocument();
    expect(container.querySelector('svg[class*="arrow-narrow-down"]')).not.toBeInTheDocument();
  });
});
