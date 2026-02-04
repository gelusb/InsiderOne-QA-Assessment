import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/homePage";
import { CareersPage } from "./pages/careersPage";
import { QaJobsPage } from "./pages/qaJobsPage";
import { LeverPage } from "./pages/leverPage";
import { Logger } from "./utils/logger";
import filters from "../test data/qa-filters.json";

test("Insider QA Jobs Flow", async ({ page }) => {
  Logger.step("Starting Insider QA Jobs Flow");

  const home = new HomePage(page);
  await home.open();
  await home.assertHomePageLoaded();

  const careers = new CareersPage(page);
  await careers.open();
  await careers.clickSeeAllQaJobs();

  const qaJobs = new QaJobsPage(page);

  // Wait for job cards BEFORE filtering
  await qaJobs.waitForJobCards();

  await qaJobs.filterJobs(filters.location, filters.department);
  await qaJobs.assertJobsListPresent();

  const jobs = await qaJobs.getJobs();
  expect.soft(jobs.length).toBeGreaterThan(0);

  for (const job of jobs) {
    Logger.info(`Validating job: ${job.position} | ${job.department} | ${job.location}`);

    expect.soft(job.department).toContain(filters.department);

    if (job.location.includes("Istanbul")) {
      expect.soft(job.location).toContain("Istanbul");
    }
  }

  const [leverPage] = await Promise.all([
    page.context().waitForEvent("page"),
    qaJobs.clickFirstViewRole()
  ]);

  const lever = new LeverPage(leverPage);
  await lever.clickApplyForThisJob();
  await lever.assertApplicationFormVisible();

  Logger.step("Completed Insider QA Jobs Flow");
});
