import { getOrdinalLabel } from './getOrdinalLabel';

export const getSchoolYear = (): string => {
  const enter = new Date('2022-04-01T12:00:00.00Z').valueOf();
  const current = new Date().valueOf();
  const oneYear = 1000 * 60 * 60 * 24 * 365;
  const duration = current - enter;
  const schoolYear = Math.floor(duration / oneYear) + 1;
  return getOrdinalLabel(schoolYear);
};
