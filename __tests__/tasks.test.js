import { describe, it, expect } from "vitest";
import { filterTasks, countUndone } from "../src/tasks.js";

describe("filterTasks", () => {
  const tasks = [
    { id: 1, text: "Buy milk",   done: false },
    { id: 2, text: "Call mum",   done: true  },
    { id: 3, text: "Fix bug",    done: false },
  ];

  it("returns all tasks when filter is 'all'", () => {
    expect(filterTasks(tasks, "all")).toHaveLength(3);
  });

  it("returns only undone tasks for 'active'", () => {
    const result = filterTasks(tasks, "active");
    expect(result).toHaveLength(2);
    expect(result.every(t => !t.done)).toBe(true);
  });

  it("returns only done tasks for 'done'", () => {
    const result = filterTasks(tasks, "done");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });
});

describe("countUndone", () => {
  it("counts undone tasks", () => {
    expect(countUndone([
      { done: false }, { done: true }, { done: false }
    ])).toBe(2);
  });
});
