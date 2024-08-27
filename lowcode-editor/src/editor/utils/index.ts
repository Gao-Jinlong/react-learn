let id = 0;
const token = "uuid";
export function generateId() {
  return `${token}${Date.now()}${id++}`;
}
