export function published(entry: Record<string, unknown>): boolean {
  return (
    entry['enabled'] !== false &&
    entry['public'] !== false &&
    !entry['private'] &&
    !entry['draft']
  );
}
