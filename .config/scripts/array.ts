export function array(value: unknown): unknown[] {
  if (!Array.isArray(value) || value.length > 1000) {
    throw new Error('Invalid profile list');
  }

  return value as unknown[];
}
