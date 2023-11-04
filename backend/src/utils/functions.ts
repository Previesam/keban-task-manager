export function env(name: string) {
  return process?.env?.[name] || '';
}
