import "server-only";

const dictionaries = {
	en: () =>
		import("../../../public/dictionaries/en.json").then(
			(module) => module.default,
		),
	ja: () =>
		import("../../../public/dictionaries/ja.json").then(
			(module) => module.default,
		),
};

export const getDictionary = async (locale) => dictionaries[locale]();
