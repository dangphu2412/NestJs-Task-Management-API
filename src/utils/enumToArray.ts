export function enumToArray(items: any): any[] {
  return Object.keys(items).map(key => items[key]);
}