import { test } from '@playwright/test';
import { getUrl, getLocator } from './config/config.js';


test.describe.serial('Get Results', () => {
  // test attributes
  test.beforeAll(async ({ page }) => {
    const url = getUrl();
    await page.goto(url);
  });
  test('Get all results', async ({ page }) => {
    const locator = getLocator();
    console.log(locator);
    /*const progressContainer = "div.custom-progress-bar-container";
    const passed = "div[class*='PASSED']";
    const failed = "div[class*='FAILED']";
    const progress = "div[class*='IN_PROGRESS']";
    const executed = "div[class*='NOT_EXECUTED']";
    const comps = "//span[text()='TC']//ancestor::div[contains(@class, 'FAILED')]";
    const cases = "//span[text()='Steps']//ancestor::div[contains(@class, 'FAILED')]";
    const fails = "//span[@class='e-icons e-image']//ancestor::div[contains(@class, 'FAILED')]";
    const folder = "span[class*='e-icons e-folder']";
    try {
      await page.waitForSelector(locator, {
        timeout: 5000,
      });
    } catch { }
    for (let i = 0;i < 10;i++) {
      await page.waitForSelector(progressContainer);
      await page.locator(progressContainer).locator(passed).click();
      await page.locator(progressContainer).locator(failed).click();
      await page.locator(progressContainer).locator(progress).click();
      await page.locator(progressContainer).locator(executed).click();
    }
    const rows = page.locator(locator);
    let count = await rows.count();
    for (let i = 0;i < count;i++) {
      await rows.nth(i).click();
    }
    const components = page.locator(comps);
    count = await components.count();
    for (let i = 0;i < count;i++) {
      await components.nth(i).click();
    }
    const steps = page.locator(cases);
    count = await steps.count();
    for (let i = 0;i < count;i++) {
      await steps.nth(i).click();
    }
    for (let i = 0;i < 5;i++) {
      await page.waitForSelector(progressContainer);
      await page.locator(progressContainer).locator(passed).click();
      await page.locator(progressContainer).locator(failed).click();
      await page.locator(progressContainer).locator(progress).click();
      await page.locator(progressContainer).locator(executed).click();
    }
    const failedSteps = page.locator(fails);
    count = await failedSteps.count();
    for (let i = 0;i < count;i++) {
      try {
        await failedSteps.nth(i).locator(folder).click({
          timeout: 1000,
        });
      } catch {
        await failedSteps.nth(i).click();
      }
    }*/
  });
});