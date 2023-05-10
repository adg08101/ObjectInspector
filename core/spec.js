import { test } from '@playwright/test';
import { getUrl, getLocator, getServer, getDB } from './config/config.js';
const mongoose = require('mongoose');


test.describe.serial('Get Results', () => {
  // test attributes
  test.beforeAll(async ({ page }) => {
    const url = getUrl();
    await page.goto(url);
  });
  test('Get all results', async ({ page }) => {
    const locator = getLocator();
    const count = await page.locator(locator).count();
    main().catch(err => console.log(err));
    const elementSchema = new mongoose.Schema({
      text: String
    });
    elementSchema.methods.getText = function getText() {
      const result = this.text
        ? `post text: ${this.text}`
        : `no data to show`;
      console.log(result);
    };
    async function main() {
      await mongoose.connect(`${getServer()}${getDB()}`);
    };
    const elementModel = mongoose.model("elements", elementSchema);
    for (var i = 0; i < count; i++) {
      var obj = page.locator(locator).nth(i);
      console.log(i + 1);
      var inner = await obj.innerText();
      console.log(inner);
      var elementObj = new elementModel({ text: `${inner}` });
      elementObj.save();
      console.log(`mongodb: ${elementObj.text}`);
      elementObj.getText();
    }
    const posts = await elementModel.find();
    console.log(posts);
  });
});