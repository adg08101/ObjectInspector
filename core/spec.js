import { test } from '@playwright/test';
import { getUrl, getLocator, getServer, getDB } from './config/config.js';
const mongoose = require('mongoose');


test.describe.serial('Get Results', () => {
  // Test attributes
  test.beforeAll(async ({ page }) => {
    const url = getUrl();
    await page.goto(url);
  });
  test('Get all results', async ({ page }) => {
    // Test attr
    const locator = getLocator();

    // One or multiple
    const count = await page.locator(locator).first().count();
    // const count = await page.locator(locator).count();
    // One or multiple

    // Test attr

    // Err func
    mongoDBConnect().catch(err => console.log(err));
    // Err func

    // Schema generator
    const elementSchema = new mongoose.Schema({
      text: String,
      selector: String,
    });
    // Schema generator

    // Method example
    elementSchema.methods.getText = function getText() {
      const result = this.text
        ? `post text: ${this.text} for selector: ${this.selector}`
        : `no data to show`;
      console.log(result);
    };
    // Method example

    // MongoDB Connect
    async function mongoDBConnect() {
      await mongoose.connect(`${getServer()}${getDB()}`);
    };
    // MongoDB Connect

    // Model
    const elementModel = mongoose.model("elements", elementSchema);
    // Model

    // GET FUNCTION ===========
    const getElement = await elementModel.find({ selector: getLocator() });
    // GET FUNCTION ===========

    // GET INNER
    var obj = page.locator(locator).first();
    var inner = await obj.innerText();
    // GET INNER

    // COMPARE FUNCTION ===========
    if (getElement && (getElement.text == inner)) {
      console.log(`****** ${getElement.text == inner} for no changes. ******`);
      return;
    } else {
      console.log(`****** ${getElement.text == inner} for no changes. ******`);
    }
    // COMPARE FUNCTION ===========

    // SAVE FUNCTION ===========
    // Main func
    for (var i = 0; i < count; i++) {
      // console.log(i + 1);
      // console.log(inner);
      var elementObj = new elementModel({
        text: `${inner}`,
        selector: `${getLocator()}`,
      });
      elementObj.save();

      // console.log(`mongodb: ${elementObj.text}`);
      // elementObj.getText();
    }
    // Main func
    // SAVE FUNCTION ===========

    // const posts = await elementModel.find();
    // console.log(posts);
  });
});