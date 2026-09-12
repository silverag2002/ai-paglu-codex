import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" className="inner-page not-found-page"><span>404</span><h1>This idea is still being worked out.</h1><p>The page may have moved, or the note has not been published yet.</p><Link className="primary-action" href="/library">Return to the library <span>→</span></Link></main>;
}
