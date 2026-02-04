import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { clickAndWait } from "../../commands/uiCommands";
import { SEE_ALL_QA_JOBS_BUTTON } from "../../selectors/careersSelectors";
import { JOB_CARD } from "../../selectors/qaJobSelectors";

export class CareersPage extends BasePage {
  readonly URL = "https://insiderone.com/careers/quality-assurance/";

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto(this.URL);
  }

  async clickSeeAllQaJobs() {
    // After this click, we expect job cards to appear on the QA Jobs page
    await clickAndWait(this.page, SEE_ALL_QA_JOBS_BUTTON);
  }
}
