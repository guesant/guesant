export function array(value: unknown): unknown[] {
  if (!Array.isArray(value) || value.length > 1000) {
    throw new Error('Expected an array with at most 1000 items');
  }

  return value as unknown[];
}
