import { downloadableCV } from "@/lib/cv";

export const dynamic = "force-static";

export function GET() {
  return new Response(downloadableCV(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Dawit-Bekele-CV.html"',
    },
  });
}
