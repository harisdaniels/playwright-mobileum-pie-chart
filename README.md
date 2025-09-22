# Playwright Automation Tests

This repository contains end-to-end (E2E) tests written using [Playwright](https://playwright.dev/) for web application automation.

## 📦 Project Structure
- `tests/` — Test files
- `pages/` — Page Object Models 
- `playwright.config.ts` — Playwright test configuration
- `package.json` — Project dependencies and scripts
- `README.md` — Project documentation

## 📁 Example Test
### Pages/pie-chart-page.ts (Class page)
```typescript
import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import { config } from '../config';

export default class PieChartPage {
  readonly page: Page;
  readonly iframe: FrameLocator;

  readonly under14: Locator;
  readonly _15to24: Locator;
  readonly _25to54: Locator;
  readonly _55to64: Locator;
  readonly above65: Locator;

  readonly loader: Locator;
  readonly loadingText: Locator;
  readonly widgetView: Locator;
  readonly worldPopulationbyBroadAgeGroups

  constructor(page: Page) {
    this.page = page;
    this.iframe = page.frameLocator("xpath=//iframe[@title='Demo']");
    this.under14 = this.iframe.locator("(//*[@class='k-chart-point'])[1]");
    this._15to24 = this.iframe.locator("(//*[@class='k-chart-point'])[2]");
    this._25to54 = this.iframe.locator("(//*[@class='k-chart-point'])[3]");
    this._55to64 = this.iframe.locator("(//*[@class='k-chart-point'])[4]");
    this.above65 = this.iframe.locator("(//*[@class='k-chart-point'])[5]");

    this.loader = this.iframe.locator('div[data-role="loader"] div');
    this.loadingText= this.iframe.locator("//div[text()='Loading ...']")
    this.widgetView = this.iframe.locator("div.k-chart-surface");
    this.worldPopulationbyBroadAgeGroups = this.iframe.locator("div.k-chart-surface svg g:nth-child(4) g:nth-child(1) text");
  }

  async goTo() {
    await this.page.goto(config.BASE_URL);
  }

  async waitLoaderInvisible() {
    await this.loader.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    await this.loader.waitFor({ state: 'hidden'});
    await this.loadingText.waitFor({ state: 'hidden'});
    await expect(this.loader).toBeHidden();
    await expect(this.under14).toBeVisible();
    await expect(this._15to24).toBeVisible();
    await expect(this._25to54).toBeVisible();
    await expect(this._55to64).toBeVisible();
    await expect(this.above65).toBeVisible();
  }

  async scrolltoChart() {
    await this.page.evaluate(() => window.scrollBy(0, 700));
  }

  async getText(element: any) {
    return await element.getAttribute('aria-label');
  }
}
```
### tests/test (test file)
```typescript

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

```


## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/harisdaniels/playwright-mobileum-trend
cd playwright-mobileum-trend
```
### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers
```bash
npx playwright install
```

### 4. Run all tests
```bash
npx playwright test
```

### 5. Run a specific test
```bash
npx playwright test tests/example.spec.ts
```

### 6. Run tests in headed mode (for debugging)
```bash
npx playwright test --headed
```

### 7. Generate HTML report
```bash
npx playwright show-report
```

