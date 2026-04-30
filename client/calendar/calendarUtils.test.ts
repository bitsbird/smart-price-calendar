import { TZDate } from '@date-fns/tz';
import { enUS } from 'date-fns/locale';
import { describe, expect, it } from 'vitest';
import {
  buildCalendarMonthOptions,
  concatMonthYear,
  createEmptyDaysColumns,
  createExpiredDaysColumns,
  filterCalendarByMonth,
  splitMontYear,
} from './calendarUtils';
import type { CalendarDay } from './types';

const createCalendarDay = (date: string): CalendarDay => {
  const dateTZ = new TZDate(date, 'UTC');
  return {
    dateTZ,
    monthTZ: dateTZ.getMonth(),
    yearTZ: dateTZ.getFullYear(),
    rooms: [],
  };
};

describe('calendarUtils', () => {
  it('builds unique month options from calendar days', () => {
    const days = [
      createCalendarDay('2026-04-01'),
      createCalendarDay('2026-04-15'),
      createCalendarDay('2026-05-01'),
    ];

    const options = buildCalendarMonthOptions(days, enUS);

    expect(options).toHaveLength(2);
    expect(options.map((item) => item.value)).toEqual(['3:2026', '4:2026']);
  });

  it('filters calendar days by month and year', () => {
    const aprilDay = createCalendarDay('2026-04-10');
    const mayDay = createCalendarDay('2026-05-10');

    const filtered = filterCalendarByMonth([aprilDay, mayDay], 3, 2026);

    expect(filtered).toEqual([aprilDay]);
  });

  it('splits and concatenates month-year values consistently', () => {
    const day = createCalendarDay('2026-06-01');
    const monthYear = concatMonthYear(day);

    expect(monthYear).toBe('5:2026');
    expect(splitMontYear(monthYear)).toEqual({
      monthTZ: '5',
      yearTZ: '2026',
    });
  });

  it('creates expired columns up to previous day in month', () => {
    const columns = createExpiredDaysColumns(new TZDate('2026-04-15', 'UTC'));

    expect(columns).toHaveLength(14);
    expect(columns[0].type).toBe('expired');
  });

  it('creates blank columns to complete the final week row', () => {
    const columns = createEmptyDaysColumns(new TZDate('2026-04-15', 'UTC'));

    expect(columns).toHaveLength(5);
    expect(columns[0].type).toBe('blank');
  });
});
