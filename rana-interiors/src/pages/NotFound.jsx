import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="btn btn--gold">Back to Home</Link>
      </div>
    </section>
  );
}
