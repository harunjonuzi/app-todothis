export function createTask(name) {
  return { id: Date.now().toString(), name: name, complete: false };
}
