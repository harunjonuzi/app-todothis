export function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [],
  };
}
