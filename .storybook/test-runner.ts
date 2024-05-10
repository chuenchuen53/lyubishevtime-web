import * as path from "path";
import * as fs from "fs";
import type { TestRunnerConfig } from "@storybook/test-runner";
import { waitForPageReady } from "@storybook/test-runner";
import { getStoryContext } from "@storybook/test-runner";

const screenshotRootDir = path.resolve(__dirname, "..", "temp", "screenshots");

const config: TestRunnerConfig = {
  // Hook that is executed before the test runner starts running tests
  setup() {
    // Add your configuration here.
  },
  /* Hook to execute before a story is initially visited before being rendered in the browser.
   * The page argument is the Playwright's page object for the story.
   * The context argument is a Storybook object containing the story's id, title, and name.
   */
  async preVisit(page, context) {
    // Add your configuration here.
  },
  /* Hook to execute after a story is visited and fully rendered.
   * The page argument is the Playwright's page object for the story
   * The context argument is a Storybook object containing the story's id, title, and name.
   */
  async postVisit(page, context) {
    console.log(context);
    await waitForPageReady(page);

    // Locate the #storybook-root element
    const storybookRoot = page.locator("#storybook-root");

    // Count the number of child elements
    const childCount = await storybookRoot.locator(">*").count();

    const img = childCount === 1 ? await storybookRoot.locator(">*:first-child").screenshot() : await storybookRoot.screenshot();

    const imgFileName = path.join(screenshotRootDir, `${context.id}.png`);

    fs.mkdirSync(path.dirname(imgFileName), { recursive: true });
    fs.writeFileSync(imgFileName, img);
  },
};

export default config;
