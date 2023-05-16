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
      innerText: String,
      innerHTML: String,
      selector: String,
      url: String,
      date: String,
    });
    // Schema generator

    // Method example
    elementSchema.methods.getInner = function getInner() {
      const result = this.innerText
        ? `post text: ${this.innerText} for selector: ${this.selector}`
        : `no data to show this time`;
      // console.log(result);
      return result;
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
    const getElement = await elementModel.findOne({ selector: getLocator() }).exec();
    // GET FUNCTION ===========

    // GET INNER
    var obj = page.locator(locator).first();
    var inner = await obj.innerText();
    var html = await obj.innerHTML();
    // GET INNER

    // COMPARE FUNCTION ===========
    if (getElement && (getElement.innerText == inner && getElement.url == getUrl())) {
      console.log(`****** ${getElement.innerText == inner && getElement.url == getUrl()} for no changes. ******`);
      return;
    } else {
      const message = getElement ?
        `****** Changed. ******` :
        `Or brand new element`;
      console.log(message);
    }
    // COMPARE FUNCTION ===========

    // SAVE FUNCTION ===========
    // Main func
    for (var i = 0; i < count; i++) {
      // console.log(i + 1);
      // console.log(inner);
      var elementObj = new elementModel({
        innerText: `${inner}`,
        innerHTML: `${html}`,
        selector: `${getLocator()}`,
        url: `${getUrl()}`,
        date: `${new Date()}`,
      });
      elementObj.save();

      // console.log(`mongodb: ${elementObj.text}`);
      // elementObj.getInner();
    }
    // Main func
    // SAVE FUNCTION ===========

    // const posts = await elementModel.find();
    // console.log(posts);
  });
});