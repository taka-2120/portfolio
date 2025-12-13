// biome-ignore lint/suspicious/noExplicitAny: value parameter accepts any enum value type
// biome-ignore lint/complexity/noBannedTypes: Object type needed for generic enum constraint
export const getEnumKey = <T extends Object>(object: T, value: any): string =>
	Object.keys(object)[Object.values(object).indexOf(value)];
