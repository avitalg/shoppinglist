export function filterTasks(tasks, filter) {
  if (filter === "active")   return tasks.filter(t => !t.done);
  if (filter === "done")     return tasks.filter(t => t.done);
  return tasks;
}

export function countUndone(tasks) {
  return tasks.filter(t => !t.done).length;
}
