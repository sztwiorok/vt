import { test as base } from "@playwright/test";
import withVisualTestPluginFixture from "@buddy-works/visual-tests-playwright";

const test = withVisualTestPluginFixture(base);

const STORAGE_KEY = "vt-tasks";

const sampleTasks = [
  {
    id: "task-1",
    title: "Buy groceries",
    description: "Milk, eggs, bread, and butter",
    status: "todo",
    priority: "medium",
    createdAt: "2025-01-15T10:00:00.000Z",
    updatedAt: "2025-01-15T10:00:00.000Z",
  },
  {
    id: "task-2",
    title: "Fix login bug",
    description: "Users cannot log in with special characters in password",
    status: "in-progress",
    priority: "high",
    createdAt: "2025-01-14T08:30:00.000Z",
    updatedAt: "2025-01-15T09:00:00.000Z",
  },
  {
    id: "task-3",
    title: "Write documentation",
    description: "Update README with new API endpoints",
    status: "done",
    priority: "low",
    createdAt: "2025-01-13T14:00:00.000Z",
    updatedAt: "2025-01-14T16:00:00.000Z",
  },
];

test.describe("Visual tests", () => {
  test("Task List - empty state", async ({ page, visualTestPlugin }) => {
    await page.goto("/");
    await visualTestPlugin.takeSnap(page, "task-list-empty");
  });

  test("Task List - with tasks", async ({ page, visualTestPlugin }) => {
    await page.addInitScript(
      ({ key, data }) => {
        localStorage.setItem(key, JSON.stringify(data));
      },
      { key: STORAGE_KEY, data: sampleTasks }
    );
    await page.goto("/");
    await visualTestPlugin.takeSnap(page, "task-list-with-tasks");
  });

  test("Task Detail - view task", async ({ page, visualTestPlugin }) => {
    await page.addInitScript(
      ({ key, data }) => {
        localStorage.setItem(key, JSON.stringify(data));
      },
      { key: STORAGE_KEY, data: sampleTasks }
    );
    await page.goto("/tasks/task-1");
    await visualTestPlugin.takeSnap(page, "task-detail");
  });

  test("Task Not Found", async ({ page, visualTestPlugin }) => {
    await page.goto("/tasks/nonexistent");
    await visualTestPlugin.takeSnap(page, "task-not-found");
  });
});
