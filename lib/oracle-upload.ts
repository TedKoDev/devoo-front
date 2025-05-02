export async function getPresignedUrl(fileName: string): Promise<string | null> {
  const res = await fetch(`/api/upload-url?filename=${encodeURIComponent(fileName)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.url;
}

export async function uploadToOracle(presignedUrl: string, file: File): Promise<string | null> {
  const res = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  return res.ok ? presignedUrl.split("?")[0] : null;
}
