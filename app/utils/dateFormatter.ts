type DateFormat = 'y' | 'ym';

export const dateFormatter = (date: Date, locale: string, format: DateFormat = 'ym') => {
  const options: Intl.DateTimeFormatOptions = {};

  if (format === 'y') {
    options.year = 'numeric';
  } else if (format === 'ym') {
    options.year = 'numeric';
    options.month = 'short';
  }

  return date.toLocaleDateString(locale, options);
};
