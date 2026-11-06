export async function responseText(response: Response): Promise<string> {
  if (response.ok) {
    return response.text();
  }

  const status = String(response.status);

  const server = response.headers.get('server') ?? 'unknown';

  const mitigation = response.headers.get('cf-mitigated') ?? 'none';

  throw new Error(
    `Profile download failed: HTTP ${status}; server=${server}; mitigation=${mitigation}`,
  );
}
