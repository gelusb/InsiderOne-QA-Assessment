import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { assertVisible } from "../../commands/uiCommands";
import { HEADER, HERO_SECTION, FOOTER } from "../../selectors/homeSelectors";

export class HomePage extends BasePage {
  readonly URL = "https://insiderone.com/";

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto(this.URL);
  }

  async assertHomePageLoaded() {
    await assertVisible(this.page, HEADER);
    await assertVisible(this.page, HERO_SECTION);
    await assertVisible(this.page, FOOTER);
  }
}
