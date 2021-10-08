import { fetchData } from './shared/fetch-data';
import { renderChart } from './shared/render-chart';
import { renderError } from './shared/render-error';
import { renderLoading } from './shared/render-loading';
import { getChartData } from './shared/get-chart-data';
import { formatScore } from './shared/format-score';

// eslint-disable-next-line
const COMPONENT_TAG = 'codersrank-skills-chart';
const STATE_IDLE = 0;
const STATE_LOADING = 1;
const STATE_ERROR = 2;
const STATE_SUCCESS = 3;

// eslint-disable-next-line
const STYLES = `$_STYLES_$`;

// eslint-disable-next-line
class CodersRankSkillsChart extends HTMLElement {
  constructor() {
    super();

    this.tempDiv = document.createElement('div');

    this.shadowEl = this.attachShadow({ mode: 'closed' });

    this.stylesEl = document.createElement('style');
    this.stylesEl.textContent = STYLES;
    this.shadowEl.appendChild(this.stylesEl);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    this.formatLabel = this.formatLabel.bind(this);
    this.onSVGMouseEnter = this.onSVGMouseEnter.bind(this);
    this.onSVGMouseMove = this.onSVGMouseMove.bind(this);
    this.onSVGMouseLeave = this.onSVGMouseLeave.bind(this);

    this.linesOffsets = [];
    this.currentIndex = null;
    this.activeSkillsSet = false;
    this.hiddenDatasets = [];
    this.highlightedDatasetLabel = null;
    this.highlightedDatasetTimeout = null;

    this.mounted = false;

    this.state = STATE_IDLE;

    this.data = {
      labels: [],
      datasets: [],
    };
  }

  // eslint-disable-next-line
  getHighestScore(scores) {
    let score = 0;
    let date = null;
    scores.forEach((scoreData) => {
      let summ = 0;
      scoreData.languages.forEach((langData) => {
        summ += langData.score;
      });
      if (summ > score) {
        score = summ;
        date = scoreData.date;
      }
    });
    return {
      score,
      date,
    };
  }

  emitData(data = {}) {
    const scores = data.scores || {};
    const event = new CustomEvent('data', {
      detail: { scores, highest: this.getHighestScore(scores) },
    });
    this.dispatchEvent(event);
  }

  emitError(err) {
    const event = new CustomEvent('error', { detail: err });
    this.dispatchEvent(event);
  }

  emitRender() {
    const event = new CustomEvent('render');
    this.dispatchEvent(event);
  }

  static get observedAttributes() {
    return [
      'username',
      'id',
      'max-labels',
      'svg-width',
      'svg-height',
      'legend',
      'labels',
      'skills',
      'active-skills',
      'show-other-skills',
      'sort-by-score',
    ];
  }

  get visibleLabels() {
    if (!this.maxLabels || this.data.labels.length <= this.maxLabels)
      return this.data.labels;
    const skipStep = Math.ceil(this.data.labels.length / this.maxLabels);
    const filtered = this.data.labels.filter((label, index) => index % skipStep === 0);
    return filtered;
  }

  // eslint-disable-next-line
  formatLabel(label) {
    if (!label) return '';
    const formatter = Intl.DateTimeFormat('en', { year: 'numeric', month: 'short' });
    return formatter.format(new Date(label));
  }

  get displaySkills() {
    const skills = this.getAttribute('skills') || '';
    if (typeof skills !== 'string') return [];
    return skills
      .split(',')
      .map((s) => s.trim())
      .filter((s) => !!s);
  }

  set skills(value) {
    this.setAttribute('skills', value);
  }

  get activeSkills() {
    const skills = this.getAttribute('active-skills') || '';
    if (typeof skills !== 'string') return [];
    return skills
      .split(',')
      .map((s) => s.trim())
      .filter((s) => !!s);
  }

  set activeSkills(value) {
    this.setAttribute('active-skills', value);
  }

  set ['active-skills'](value) {
    this.setAttribute('active-skills', value);
  }

  get showOtherSkills() {
    const showOtherSkills = this.getAttribute('show-other-skills');
    if (showOtherSkills === '' || showOtherSkills === 'true') return true;
    return false;
  }

  set showOtherSkills(value) {
    this.setAttribute('show-other-skills', value);
  }

  set ['show-other-skills'](value) {
    this.setAttribute('show-other-skills', value);
  }

  get tooltip() {
    const tooltip = this.getAttribute('tooltip');
    if (tooltip === '' || tooltip === 'true') return true;
    return false;
  }

  set tooltip(value) {
    this.setAttribute('tooltip', value);
  }

  get username() {
    return this.getAttribute('username');
  }

  set username(value) {
    this.setAttribute('username', value);
  }

  get id() {
    return this.getAttribute('id');
  }

  set id(value) {
    this.setAttribute('id', value);
  }

  get maxLabels() {
    const maxLabels = parseInt(this.getAttribute('max-labels') || 0, 10);
    return maxLabels || 8;
  }

  set maxLabels(value) {
    this.setAttribute('max-labels', value);
  }

  set ['max-labels'](value) {
    this.setAttribute('max-labels', value);
  }

  get svgWidth() {
    const svgWidth = parseInt(this.getAttribute('svg-width') || 0, 10);
    return svgWidth || 640;
  }

  set svgWidth(value) {
    this.setAttribute('svg-width', value);
  }

  set ['svg-width'](value) {
    this.setAttribute('svg-width', value);
  }

  get svgHeight() {
    const svgHeight = parseInt(this.getAttribute('svg-height') || 0, 10);
    return svgHeight || 320;
  }

  set svgHeight(value) {
    this.setAttribute('svg-height', value);
  }

  set ['svg-height'](value) {
    this.setAttribute('svg-height', value);
  }

  get legend() {
    const legend = this.getAttribute('legend');
    if (legend === '' || legend === 'true') return true;
    return false;
  }

  set legend(value) {
    this.setAttribute('legend', value);
  }

  get labels() {
    const labels = this.getAttribute('labels');
    if (labels === '' || labels === 'true') return true;
    return false;
  }

  set labels(value) {
    this.setAttribute('labels', value);
  }

  get branding() {
    return this.getAttribute('branding') !== 'false';
  }

  set branding(value) {
    this.setAttribute('branding', value);
  }

  get sortByScore() {
    const sortByScore = this.getAttribute('sort-by-score');
    if (sortByScore === '' || sortByScore === 'true') return true;
    return false;
  }

  set sortByScore(value) {
    this.setAttribute('sort-by-score', value);
  }

  set ['sort-by-score'](value) {
    this.setAttribute('sort-by-score', value);
  }

  render() {
    const {
      username,
      id,
      mounted,
      state,
      shadowEl,
      data,
      svgWidth,
      svgHeight,
      legend,
      labels,
      branding,
      sortByScore,

      hiddenDatasets,
      highlightedDatasetLabel,
      visibleLabels,
      currentIndex,
      formatLabel,
      tempDiv,
    } = this;
    const ctx = {
      data,
      svgWidth,
      svgHeight,
      legend,
      labels,
      branding,
      sortByScore,

      hiddenDatasets,
      highlightedDatasetLabel,
      visibleLabels,
      currentIndex,
      formatLabel,
    };
    this.detachSVGEvents();

    if ((!username && !id) || !mounted) return;
    if (state === STATE_SUCCESS) {
      tempDiv.innerHTML = renderChart(ctx);
    } else if (state === STATE_ERROR) {
      tempDiv.innerHTML = renderError(ctx);
    } else if (state === STATE_IDLE || state === STATE_LOADING) {
      tempDiv.innerHTML = renderLoading(ctx);
    }

    let widgetEl = shadowEl.querySelector('.codersrank-skills-chart');
    if (widgetEl) {
      widgetEl.parentNode.removeChild(widgetEl);
    }
    widgetEl = tempDiv.querySelector('.codersrank-skills-chart');
    if (!widgetEl) return;
    this.widgetEl = widgetEl;
    shadowEl.appendChild(widgetEl);
    this.attachSVGEvents();
    if (state === STATE_SUCCESS) {
      this.emitRender();
    }
  }

  loadAndRender() {
    const { username, id } = this;
    this.state = STATE_LOADING;
    this.render();
    fetchData(username, id)
      .then((data) => {
        this.emitData(data);
        this.data = getChartData(
          data.scores,
          this.displaySkills,
          this.showOtherSkills,
          this.sortByScore,
        );
        if (this.activeSkills && this.activeSkills.length && !this.activeSkillsSet) {
          this.hiddenDatasets = this.data.datasets
            .map((d) => d.label)
            .filter((l) => this.activeSkills.indexOf(l) < 0);
          this.activeSkillsSet = true;
        }
        this.state = STATE_SUCCESS;
        this.render();
      })
      .catch((err) => {
        this.emitError(err);
        this.state = STATE_ERROR;
        this.render();
      });
  }

  tooltipText() {
    const currentIndex = this.currentIndex;
    const { datasets, labels } = this.data;
    if (currentIndex === null) return '';
    let total = 0;
    const currentValues = datasets
      .filter(
        (dataset) =>
          !this.hiddenDatasets.includes(dataset.label) && dataset.values[currentIndex],
      )
      .map((dataset) => ({
        color: dataset.color,
        label: dataset.label,
        value: dataset.values[currentIndex],
      }));
    currentValues.forEach((dataset) => {
      total += dataset.value;
    });

    const labelText = this.formatLabel(labels[currentIndex]);
    const totalText = `${formatScore(total)} exp. points`;
    // prettier-ignore
    const datasetsText = currentValues.length > 0 ? `
      <ul class="codersrank-skills-chart-tooltip-list">
        ${currentValues
          .map(({ label, color, value }) => {
            const valueText = `${label}: ${formatScore(value)}`;
            return `
              <li><span style="background-color: ${color};"></span>${valueText}</li>
            `;
          }).join('')}
      </ul>` : '';
    // prettier-ignore
    return `
        <div class="codersrank-skills-chart-tooltip-label">${labelText}</div>
        <div class="codersrank-skills-chart-tooltip-total">${totalText}</div>
        ${datasetsText}
      `;
  }

  showTooltip() {
    if (!this.tooltip) return;
    const visibleDataSets = this.data.datasets.filter(
      (dataset) => !this.hiddenDatasets.includes(dataset.label),
    ).length;
    if (!visibleDataSets) {
      this.hideTooltip();
      return;
    }

    const prevLineEl = this.shadowEl.querySelector(
      '.codersrank-skills-chart-current-line',
    );
    if (prevLineEl) prevLineEl.classList.remove('codersrank-skills-chart-current-line');

    const lineEl = this.shadowEl.querySelector(`line[data-index="${this.currentIndex}"]`);
    if (!lineEl) return;
    lineEl.classList.add('codersrank-skills-chart-current-line');

    let tooltipEl = this.widgetEl.querySelector('.codersrank-skills-chart-tooltip');
    if (!tooltipEl) {
      this.tempDiv.innerHTML = `
        <div class="codersrank-skills-chart-tooltip">
          ${this.tooltipText()}
        </div>
      `;
      tooltipEl = this.tempDiv.querySelector('.codersrank-skills-chart-tooltip');
      this.widgetEl.querySelector('.codersrank-skills-chart-svg').appendChild(tooltipEl);
    } else {
      tooltipEl.innerHTML = this.tooltipText();
    }

    const widgetElRect = this.widgetEl.getBoundingClientRect();
    const lineElRect = lineEl.getBoundingClientRect();
    const left = lineElRect.left - widgetElRect.left;
    if (left < 180) {
      tooltipEl.classList.add('codersrank-skills-chart-tooltip-right');
    } else {
      tooltipEl.classList.remove('codersrank-skills-chart-tooltip-right');
    }
    tooltipEl.style.left = `${left}px`;
  }

  hideTooltip() {
    if (!this.tooltip) return;
    const lineEl = this.shadowEl.querySelector('.codersrank-skills-chart-current-line');
    if (lineEl) lineEl.classList.remove('codersrank-skills-chart-current-line');
    const tooltipEl = this.shadowEl.querySelector('.codersrank-skills-chart-tooltip');
    if (!tooltipEl) return;
    this.widgetEl.querySelector('.codersrank-skills-chart-svg').removeChild(tooltipEl);
  }

  toggleDataset(label) {
    this.highlightedDatasetLabel = null;
    if (this.hiddenDatasets.includes(label)) {
      this.hiddenDatasets.splice(this.hiddenDatasets.indexOf(label), 1);
    } else {
      this.hiddenDatasets.push(label);
      this.highlightedDatasetLabel = null;
    }
    this.render();
  }

  onClick(e) {
    let buttonEl;
    if (e.target.tagName === 'BUTTON') buttonEl = e.target;
    else if (e.target.parentNode && e.target.parentNode.tagName === 'BUTTON')
      buttonEl = e.target.parentNode;
    if (!buttonEl) return;
    const label = buttonEl.getAttribute('data-label');
    this.toggleDataset(label);
  }

  onMouseEnter(e) {
    if (!this.widgetEl) return;
    let buttonEl;
    if (e.target.tagName === 'BUTTON') buttonEl = e.target;
    if (!buttonEl) return;
    const label = buttonEl.getAttribute('data-label');
    if (!label) return;
    const polygon = this.widgetEl.querySelector(`polygon[data-label="${label}"]`);
    if (!polygon) return;
    clearTimeout(this.highlightedDatasetTimeout);
    this.highlightedDatasetTimeout = setTimeout(() => {
      this.highlightedDatasetLabel = label;

      const polygons = this.widgetEl.querySelectorAll('polygon');
      for (let i = 0; i < polygons.length; i += 1) {
        polygons[i].classList.add('codersrank-skills-chart-hidden');
      }
      polygon.classList.remove('codersrank-skills-chart-hidden');
    }, 100);
  }

  onMouseLeave(e) {
    if (e.target.tagName !== 'BUTTON') return;
    this.highlightedDatasetTimeout = setTimeout(() => {
      if (!this.widgetEl) return;
      const polygons = this.widgetEl.querySelectorAll('polygon');
      if (!polygons) return;
      for (let i = 0; i < polygons.length; i += 1) {
        polygons[i].classList.remove('codersrank-skills-chart-hidden');
      }
    }, 100);
  }

  calcLinesOffsets() {
    const lines = this.widgetEl.querySelectorAll('line');
    this.linesOffsets = [];
    for (let i = 0; i < lines.length; i += 1) {
      // @ts-ignore
      this.linesOffsets.push(lines[i].getBoundingClientRect().left);
    }
  }

  onSVGMouseEnter() {
    if (!this.tooltip) return;
    this.calcLinesOffsets();
  }

  onSVGMouseMove(e) {
    if (!this.tooltip) return;
    let currentLeft = e.pageX;
    if (typeof currentLeft === 'undefined') currentLeft = 0;
    const distances = this.linesOffsets.map((left) => Math.abs(currentLeft - left));
    const minDistance = Math.min(...distances);
    const closestIndex = distances.indexOf(minDistance);
    this.currentIndex = closestIndex;
    this.showTooltip();
  }

  onSVGMouseLeave() {
    if (!this.tooltip) return;
    this.currentIndex = null;
    this.hideTooltip();
  }

  attachSVGEvents() {
    if (!this.widgetEl) return;
    const svgEl = this.widgetEl.querySelector('svg');
    if (!svgEl) return;
    svgEl.addEventListener('mouseenter', this.onSVGMouseEnter);
    svgEl.addEventListener('mousemove', this.onSVGMouseMove);
    svgEl.addEventListener('mouseleave', this.onSVGMouseLeave);
  }

  detachSVGEvents() {
    if (!this.widgetEl) return;
    const svgEl = this.widgetEl.querySelector('svg');
    if (!svgEl) return;
    svgEl.removeEventListener('mouseenter', this.onSVGMouseEnter);
    svgEl.removeEventListener('mousemove', this.onSVGMouseMove);
    svgEl.removeEventListener('mouseleave', this.onSVGMouseLeave);
  }

  attributeChangedCallback() {
    if (!this.mounted) return;
    this.loadAndRender();
  }

  connectedCallback() {
    this.width = this.offsetWidth;
    this.mounted = true;
    this.loadAndRender();
    this.shadowEl.addEventListener('click', this.onClick, true);
    this.shadowEl.addEventListener('mouseenter', this.onMouseEnter, true);
    this.shadowEl.addEventListener('mouseleave', this.onMouseLeave, true);
  }

  disconnectedCallback() {
    this.mounted = false;
    this.shadowEl.removeEventListener('click', this.onClick);
    this.shadowEl.removeEventListener('mouseenter', this.onMouseEnter);
    this.shadowEl.removeEventListener('mouseleave', this.onMouseLeave);
    this.detachSVGEvents();
  }
}

// EXPORT
