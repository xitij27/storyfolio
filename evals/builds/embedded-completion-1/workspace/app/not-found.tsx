import Link from "next/link";
export default function NotFound() { return <main className="missing-page"><p>404 / Missing address</p><h1>This page is not here.</h1><Link href="/">Home</Link> · <a href="mailto:ada@example.com">Email Ada</a></main>; }
