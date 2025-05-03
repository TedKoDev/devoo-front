function CalculateReadingTime(html: string): number {
  if (typeof window === "undefined") return 1; // SSR 안전 처리

  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = doc.body.textContent || "";
  const charCount = text.replace(/\s+/g, "").length;

  return Math.max(1, Math.ceil(charCount / 350)); // 350자당 1분
}
export default CalculateReadingTime;
