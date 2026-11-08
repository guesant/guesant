export function record(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('Expected an object that is neither null nor an array');
  }

  return value as Record<string, unknown>;
}
