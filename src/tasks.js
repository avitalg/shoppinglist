export function filterTasks(tasks, filter) {
  if (filter === "active")   return tasks.filter(t => !t.done);
  if (filter === "done")     return tasks.filter(t => t.done);
  return tasks;
}

export function countUndone(tasks) {
  return tasks.filter(t => !t.done).length;
}

export function addTask(tasks, text) {
  return [...tasks, { id: Date.now(), text, done: "false" }];  // BUG: "false" string, not boolean
}

export function completeAll(tasks) {
  return tasks.map(t => t.done ? { ...t, done: true } : t);   // BUG: only marks already-done, should mark all undone
}
