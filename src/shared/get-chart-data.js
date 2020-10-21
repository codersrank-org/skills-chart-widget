import { getColor } from './get-color';

export const getChartData = (data = [], displaySkills = []) => {
  const scoresData = [...data];
  scoresData.reverse();

  const languagesList = [];
  scoresData.forEach((score) => {
    score.languages.forEach((languageData) => {
      if (displaySkills.length && !displaySkills.includes(languageData.language)) return;
      if (!languagesList.includes(languageData.language)) {
        languagesList.push(languageData.language);
      }
    });
  });

  const labels = scoresData.map((score) => score.date);
  const datasets = languagesList.map((language) => {
    const values = [];
    scoresData.forEach((score) => {
      const languageData = score.languages.filter(
        (langData) => langData.language === language,
      )[0];
      values.push(languageData ? languageData.score : 0);
    });
    return {
      label: language,
      color: getColor(language),
      values,
    };
  });

  datasets.sort((a, b) => {
    if (b.label === 'Other') return -1;
    return a.label > b.label ? 1 : -1;
  });

  return {
    labels,
    datasets,
  };
};
