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