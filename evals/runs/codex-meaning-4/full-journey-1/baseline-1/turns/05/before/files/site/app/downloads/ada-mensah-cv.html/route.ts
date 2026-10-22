import {cvDocument} from '@/content/cv-document';
export const dynamic='force-static';
export function GET(){return new Response(cvDocument(),{headers:{'Content-Type':'text/html; charset=utf-8','Content-Disposition':'attachment; filename="ada-mensah-cv.html"','X-Content-Type-Options':'nosniff'}})}
