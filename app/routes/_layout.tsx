import { Form, href, Link, Outlet } from 'react-router';
import { isLoggedIn } from '~/session.server';
import { Route } from './+types/_layout';
import { useState } from 'react';

export async function loader({ request }: Route.LoaderArgs) {
  return await isLoggedIn(request);
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-2 min-h-screen">
      <div className="navbar bg-primary text-primary-content shadow-sm">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to={href('/')}>
            My Cool App
          </Link>
        </div>
        <div className="flex-none">
          <SignedInState user={loaderData?.user} />
        </div>
      </div>
      <div className="prose mx-auto flex-1">
        <Outlet />
      </div>
    </div>
  );
}

function SignedInState({ user }: { user: string | undefined }) {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-2">
      <Link className="link" to="/foo/bar">
        Foo Bar
      </Link>
      <Link className="link" to={href('/with-error')}>
        Page with error
      </Link>

      <button className="btn btn-ghost" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      {user ? (
        <>
          <Link className="btn btn-ghost" to={href('/dashboard')}>
            Dashboard
          </Link>
          <Link className="btn btn-ghost" to={href('/settings')}>
            Settings
          </Link>
          <Form method="post" action={href('/signout')} className="contents">
            <button type="submit" className="btn btn-ghost">
              Sign Out
            </button>
          </Form>
        </>
      ) : (
        <Link className="btn btn-ghost" to={href('/signin')}>
          Sign In
        </Link>
      )}
    </div>
  );
}
