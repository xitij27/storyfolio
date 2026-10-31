import { cvHtml } from "@/content/cv";
export const dynamic = "force-static";
export function GET() {
  return new Response(cvHtml(), { headers: {
    "Content-Type": "text/html; charset=utf-8",
    "Content-Disposition": 'attachment; filename="dawit-bekele-cv.html"',
    "X-Content-Type-Options": "nosniff",
  } });
}
