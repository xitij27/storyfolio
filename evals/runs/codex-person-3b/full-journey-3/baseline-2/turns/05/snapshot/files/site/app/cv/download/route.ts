import { cvDownloadHtml } from "@/content/cv";
export function GET(){return new Response(cvDownloadHtml(),{headers:{"Content-Type":"text/html; charset=utf-8","Content-Disposition":'attachment; filename="dawit-bekele-cv.html"',"X-Content-Type-Options":"nosniff"}});}
