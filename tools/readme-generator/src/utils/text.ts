export function text(value: unknown, allowEmpty = false): string {
  if (
    typeof value !== 'string' ||
    value.length > 4096 ||
    // eslint-disable-next-line no-control-regex -- Reject non-printable input at the source boundary.
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/u.test(value)
  ) {
    throw new Error(
      'Expected a string up to 4096 characters without invalid control characters',
    );
  }

  const result = value.trim();

  if (!allowEmpty && !result) {
    throw new Error('Expected non-empty text');
  }

  return result;
}
