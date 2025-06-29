import { data } from 'react-router';

export function loader() {
  return data(null, { status: 404 });
}

export function action() {
  return data(null, { status: 404 });
}

export default function NotFound() {
  return (
    <section className="alert alert-error text-error-content flex flex-col gap-4 p-4 min-w-sm">
      <header className="font-bold text-3xl">Not Found</header>
      <p>We couldn't find the page you were looking for.</p>
    </section>
  );
}
