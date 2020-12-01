import { codersrRankLogo } from './codersrank-logo';

export const renderChart = ({
  data,
  svgWidth: width,
  svgHeight: height,
  legend: showLegend,
  labels: showLabels,
  preloader,
  branding,

  hiddenDatasets,
  highlightedDatasetLabel,
  visibleLabels,
  currentIndex,
  formatLabel,
} = {}) => {
  const { datasets, labels } = data;

  const getSummValues = () => {
    const summValues = [];
    datasets
      .filter((dataset) => !hiddenDatasets.includes(dataset.label))
      .forEach(({ values }) => {
        values.forEach((value, valueIndex) => {
          if (!summValues[valueIndex]) summValues[valueIndex] = 0;
          summValues[valueIndex] += value;
        });
      });
    return summValues;
  };

  const getPolygons = () => {
    const summValues = getSummValues();
    const polygons = [];
    if (!datasets.length) {
      return polygons;
    }
    const lastValues = datasets[0].values.map(() => 0);

    const maxValue = Math.max(...summValues);
    datasets
      .filter((dataset) => !hiddenDatasets.includes(dataset.label))
      .forEach(({ label, values, color }) => {
        const points = values.map((originalValue, valueIndex) => {
          lastValues[valueIndex] += originalValue;
          const value = lastValues[valueIndex];
          const x = (valueIndex / (values.length - 1)) * width;
          const y = height - (value / maxValue) * height;
          return `${x} ${y}`;
        });
        points.push(`${width} ${height} 0 ${height}`);

        polygons.push({
          label,
          points: points.join(' '),
          color,
        });
      });
    return polygons.reverse();
  };

  const getLines = () => {
    const lines = [];
    if (!datasets.length) {
      return lines;
    }
    const values = datasets[0].values;
    values.forEach((value, valueIndex) => {
      const x = (valueIndex / (values.length - 1)) * width;
      lines.push(x);
    });
    return lines;
  };

  const polygons = getPolygons();
  const lines = getLines();

  // prettier-ignore
  return /* html */`
    <div class="codersrank-skills-chart">
      <div class="codersrank-skills-chart-svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="${width}"
          height="${height}"
          viewBox="0 0 ${width} ${height}"
          preserveAspectRatio="none"
        >
          ${polygons.map((polygon) => /* html */`
          <polygon
            fill="${polygon.color}"
            fillRule="evenodd"
            points="${polygon.points}"
            data-label="${polygon.label}"
            class="${highlightedDatasetLabel && highlightedDatasetLabel !== polygon.label ? 'codersrank-skills-chart-hidden' : ''}"
          />
          `).join('')}
          ${lines.map((line, index) => /* html */`
          <line
            data-index="${index}"
            fill="#000"
            x1="${line}"
            y1="${0}"
            x2="${line}"
            y2="${height}"
            class="${currentIndex === index ? 'codersrank-skills-chart-current-line' : ''}"
          />
          `).join('')}
        </svg>
        ${preloader ? /* html */`
        <div class="codersrank-skills-chart-preloader"></div>
        ` : ''}
      </div>
      ${showLabels ? /* html */`
      <div class="codersrank-skills-chart-axis">
        ${labels.map((label) => /* html */`
        <span>
          ${visibleLabels.includes(label) ? /* html */`
          <span>${formatLabel(label)}</span>
          ` : ''}
        </span>
        `).join('')}
      </div>
      ` : ''}
      ${showLegend ? /* html */`
      <div class="codersrank-skills-chart-legend">
        ${datasets.map((dataset) => /* html */`
        <button
          data-label="${dataset.label}"
          class="codersrank-skills-chart-legend-button ${hiddenDatasets.includes(dataset.label) ? 'codersrank-skills-chart-legend-button-hidden' : ''}"
          type="button"
        >
          <span style="background-color: ${dataset.color}"></span>
          ${dataset.label}
        </button>
        `).join('')}
      </div>
      ` : ''}
      ${branding ? /* html */`
      <div class="codersrank-skills-chart-branding">
        <a href="https://codersrank.io" target="_blank" rel="noopener noreferrer">
          <span>Powered by </span>
          ${codersrRankLogo}
        </a>
      </div>
      ` : ''}
    </div>
  `;
};
