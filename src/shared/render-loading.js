import { renderChart } from './render-chart';

export const renderLoading = (ctx) => {
  return renderChart({
    ...ctx,
    preloader: true,
    data: { labels: [], datasets: [] },
  });
};
