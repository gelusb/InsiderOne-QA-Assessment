import { Page, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { Logger } from "../utils/logger";

import {
  LOCATION_FILTER,
  DEPARTMENT_FILTER,
  JOB_CARD,
  JOB_POSITION,
  JOB_DEPARTMENT,
  JOB_LOCATION,
  VIEW_ROLE_BUTTON
} from "../../selectors/qaJobSelectors";

export interface JobInfo {
  position: string;
  department: string;
  location: string;
}

export class QaJobsPage {
  constructor(public page: Page) {}

  async waitForJobCards() {
    Logger.step("Waiting for job cards to load");

    await this.page.waitForFunction(() => {
      return document.querySelectorAll('.position-list-item').length > 0;
    }, { timeout: 35000 });
  }

  async filterJobs(location: string, department: string) {
    Logger.step(`Filtering jobs → Location: ${location}, Department: ${department}`);

    await allure.step("Filter jobs", async () => {
      await this.page.locator(LOCATION_FILTER).selectOption({ label: location });
      await this.page.locator(DEPARTMENT_FILTER).selectOption({ label: department });

      // Wait for filtered results to load
      await this.waitForJobCards();
    });
  }

  async assertJobsListPresent() {
    Logger.step("Checking that job list is present");

    await this.waitForJobCards();

    const count = await this.page.locator(JOB_CARD).count();
    Logger.info(`Found ${count} job cards after filtering`);
    expect.soft(count).toBeGreaterThan(0);
  }

  async getJobs(): Promise<JobInfo[]> {
    Logger.step("Extracting job information from job cards");

    await this.waitForJobCards();

    const cards = this.page.locator(JOB_CARD);
    const count = await cards.count();
    const jobs: JobInfo[] = [];

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);

      const position = (await card.locator(JOB_POSITION).innerText()).trim();
      const department = (await card.locator(JOB_DEPARTMENT).innerText()).trim();
      const location = (await card.locator(JOB_LOCATION).innerText()).trim();

      jobs.push({ position, department, location });

      Logger.info(`Job ${i + 1}: ${position} | ${department} | ${location}`);
    }

    return jobs;
  }

  async clickFirstViewRole() {
    Logger.step("Clicking first 'View Role' button");

    await allure.step("Click first View Role", async () => {
      await this.page.locator(VIEW_ROLE_BUTTON).first().click();
    });
  }
}
