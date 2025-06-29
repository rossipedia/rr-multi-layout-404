import { Form, href, redirect } from 'react-router';
import { Route } from './+types/signin';
import { auth, signIn } from '~/session.server';

export async function action({ request }: Route.ActionArgs) {
  try {
    await signIn(request);
  } catch (reason) {
    if (reason instanceof Response) {
      throw reason;
    }
    return {
      error: 'Invalid username or password',
    };
  }
}

export default function Signin({ actionData }: Route.ComponentProps) {
  // A Daisy UI sign-in form example
  return (
    <div className="flex flex-col justify-center grow min-w-sm card bg-base-200 shadow gap-4 p-4">
      <Form method="post" className="contents">
        <input
          placeholder='Username is "user"'
          name="username"
          className="input input-neutral input-sm w-full"
        />
        <input
          placeholder='Password is "password"'
          type="password"
          name="password"
          className="input input-neutral input-sm w-full"
        />
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
        {actionData?.error && (
          <div className="text-error">{actionData.error}</div>
        )}
      </Form>
    </div>
  );
}
