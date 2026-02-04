import { Page } from "@playwright/test";
import { allure } from "allure-playwright";
import { Logger } from "../utils/logger";
import { assertVisible } from "../../commands/uiCommands";

import {
  APPLY_FOR_JOB_BUTTON,
  APPLICATION_FORM
} from "../../selectors/leverSelectors";

export class LeverPage {
  constructor(public page: Page) {}

  async clickApplyForThisJob() {
    Logger.step("Clicking 'Apply for this job' on Lever page");

    await allure.step("Click Apply for this job", async () => {
      await this.page.locator(APPLY_FOR_JOB_BUTTON).first().click();
    });
  }

  async assertApplicationFormVisible() {
    Logger.step("Asserting Lever application form is visible");

    await allure.step("Assert application form visible", async () => {
      await assertVisible(this.page, APPLICATION_FORM);
    });
  }
}
