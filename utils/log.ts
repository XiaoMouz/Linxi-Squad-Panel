export default function uploadErrorLog(location: string, e: any) {
  fetch("/api/log/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      location,
      message: e.message,
      stack: e,
      type: "error",
    }),
  });
}
