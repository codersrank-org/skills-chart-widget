import { getColor } from './get-color';

export const getChartData = (data = [], displaySkills = [], showOtherSkills = false) => {
  const scoresData = [...data];
  scoresData.reverse();

  const languagesList = [];
  scoresData.forEach((score) => {
    score.languages.forEach((languageData) => {
      if (displaySkills.length > 0) {
        const inDisplaySkills = displaySkills
          .map((s) => s.toLowerCase())
          .includes(languageData.language.toLowerCase());
        if (!inDisplaySkills) return;
      }
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

  let otherDataset;
  if (showOtherSkills) {
    const values = [];
    scoresData.forEach((score) => {
      let otherScore = 0;
      score.languages.forEach((langData) => {
        if (!languagesList.includes(langData.language)) {
          otherScore += langData.score;
        }
      });
      values.push(otherScore);
    });
    otherDataset = {
      label: 'Other',
      color: 'var(--other-skills-area-color)',
      values,
    };
  }

  datasets.sort((a, b) => {
    return a.label > b.label ? 1 : -1;
  });

  if (otherDataset) {
    datasets.push(otherDataset);
  }

  return {
    labels,
    datasets,
  };
};
