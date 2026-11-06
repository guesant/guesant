export function text(value: unknown, allowEmpty = false): string {
  if (
    typeof value !== 'string' ||
    value.length > 4096 ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/u.test(value)
  ) {
    throw new Error('Invalid profile text');
  }

  const result = value.trim();

  if (!allowEmpty && !result) {
    throw new Error('Missing profile text');
  }

  return result;
}
