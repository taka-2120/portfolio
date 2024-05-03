const dictionaries: { [key: string]: () => Promise<any> } = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  ja: () => import('../dictionaries/ja.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  'use server-only';

  dictionaries[locale]();
};
