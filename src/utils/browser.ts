export function isInAppBrowser(): boolean {
  const ua =
    typeof window !== "undefined"
      ? window.navigator.userAgent ||
        window.navigator.vendor ||
        (window as any).opera
      : "";

  const rules = [
    "WebView",
    "(iPhone|iPod|iPad)(?!.*Safari/)",
    "Android.*(wv|\\.0\\.0\\.0)",
    "FBAV", // Facebook
    "FBAN", // Facebook
    "Instagram", // Instagram
    "LinkedInApp", // LinkedIn
    "Snapchat", // Snapchat
    "Twitter", // Twitter
    "Line", // Line
    "MicroMessenger", // WeChat
    "Threads", // Threads
  ];

  const regex = new RegExp(`(${rules.join("|")})`, "ig");
  return Boolean(ua.match(regex));
}
