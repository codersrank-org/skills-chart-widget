import { getColor } from './get-color';

export const getChartData = (
  data = [],
  displaySkills = [],
  showOtherSkills = false,
  sortByScore = false,
) => {
  const scoresData = [...data];

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
    let maxScore = 0;
    scoresData.forEach((score) => {
      const languageData = score.languages.filter(
        (langData) => langData.language === language,
      )[0];
      if (languageData && languageData.score > maxScore) maxScore = languageData.score;
      values.push(languageData ? languageData.score : 0);
    });
    return {
      label: language,
      color: getColor(language),
      values,
      maxScore,
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

  if (sortByScore) {
    datasets.sort((a, b) => {
      return a.maxScore > b.maxScore ? -1 : 1;
    });
  } else {
    datasets.sort((a, b) => {
      return a.label > b.label ? 1 : -1;
    });
  }

  if (otherDataset) {
    datasets.push(otherDataset);
  }

  return {
    labels,
    datasets,
  };
};
