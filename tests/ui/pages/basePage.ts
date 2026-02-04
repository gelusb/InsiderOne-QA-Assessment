import { Page } from "@playwright/test";

export class BasePage {
  constructor(public page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState("networkidle");
  }
}
