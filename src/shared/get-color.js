import { languageColors } from './language-colors';
import { stringToColor } from './string-to-color';

export const getColor = (language) => {
  return languageColors[language]
    ? languageColors[language]
    : stringToColor(language, false);
};
