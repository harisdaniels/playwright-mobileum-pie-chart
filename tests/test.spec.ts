import { test, expect } from '@playwright/test';
import PieChartPage from '../pages/pie-chart-page';

test('Assert Pie Chart', async ({ page }) => {
  const pieChart: PieChartPage = new PieChartPage(page);
  await pieChart.goTo();
  await pieChart.scrolltoChart();
  await pieChart.waitLoaderInvisible();

  expect(await pieChart.getText(pieChart.under14)).toEqual("0-14 years old: 25.45%");
  expect(await pieChart.getText(pieChart._15to24)).toEqual("15-24 years old: 15.52%");
  expect(await pieChart.getText(pieChart._25to54)).toEqual("25-54 years old: 40.59%");
  expect(await pieChart.getText(pieChart._55to64)).toEqual("55-64 years old: 9.11%");
  expect(await pieChart.getText(pieChart.above65)).toEqual("65+ years old: 9.33%");
});