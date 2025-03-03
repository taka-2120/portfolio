// biome-ignore lint/suspicious/noExplicitAny: <explanation>
// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const getEnumKey = <T extends Object>(object: T, value: any): string =>
	Object.keys(object)[Object.values(object).indexOf(value)];
