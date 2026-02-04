import { Page, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { Logger } from "../ui/utils/logger";

export async function clickAndWait(page: Page, selector: string) {
  Logger.step(`Clicking element: ${selector}`);

  await allure.step(`Click ${selector}`, async () => {
    await page.locator(selector).click({ timeout: 15000 });
  });
}


export async function assertVisible(page: Page, selector: string) {
  Logger.step(`Asserting visibility: ${selector}`);

  await allure.step(`Assert visible: ${selector}`, async () => {
    await expect(page.locator(selector)).toBeVisible();
  });
}
