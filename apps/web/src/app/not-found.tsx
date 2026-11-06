import Link from "next/link";
export default function NotFound(){return <main className="simple-page"><div className="eyebrow">404 / BOOK NOT FOUND</div><h1>Looks like this<br/><em>chapter ended.</em></h1><p>The page or book you are looking for may have been moved.</p><Link className="primary-btn" href="/explore">Browse books ↗</Link></main>}
