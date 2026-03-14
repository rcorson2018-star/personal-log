const { test } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const VARIANTS = [
  { id: 1, name: 'minimal-centered' },
  { id: 2, name: 'terminal-left' },
  { id: 3, name: 'split' },
];

test.beforeAll(async () => {
  fs.mkdirSync('hero-previews', { recursive: true });
});

test.describe('Hero variants', () => {
  for (const v of VARIANTS) {
    test(`hero ${v.id} - ${v.name}`, async ({ page }, testInfo) => {
      await page.goto(`/?hero=${v.id}`);
      await page.waitForSelector(`#hero-${v.id}.active`, { state: 'visible' });
      await page.screenshot({
        path: path.join('hero-previews', `hero-${v.id}-${v.name}-${testInfo.project.name}.png`),
        fullPage: true,
      });
    });
  }
});
