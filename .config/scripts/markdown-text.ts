export function markdownText(value: string): string {
  return value
    .replaceAll(/[\\`*_{}\[\]<>!#|()]/gu, '\\$&')
    .replaceAll(/[\r\n]+/gu, ' ');
}
