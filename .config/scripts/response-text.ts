export async function responseText(response: Response): Promise<string> {
  if (!response.ok) {
    throw new Error(`Source download failed: HTTP ${response.status}`);
  }

  const reader = response.body?.getReader();

  if (!reader) {
    throw new Error('Source response has no body');
  }

  const chunks: Uint8Array[] = [];

  let size = 0;

  try {
    for (;;) {
      const chunk = await reader.read();

      if (chunk.done) {
        const buffer = Buffer.concat(chunks);

        return buffer.toString('utf8');
      }

      size += chunk.value.byteLength;

      if (size > 1048576) {
        throw new Error('Source response exceeds size limit');
      }

      chunks.push(chunk.value);
    }
  } finally {
    await reader.cancel();

    reader.releaseLock();
  }
}
