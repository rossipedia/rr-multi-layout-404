import { createCookieSessionStorage, href, redirect } from 'react-router';
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';

export type UserSession = {
  user: string;
};

const sessionStorage = createCookieSessionStorage<UserSession>();

export const auth = new Authenticator<UserSession>();

auth.use(
  new FormStrategy(async ({ form }) => {
    const username = String(form.get('username'));
    const password = String(form.get('password'));

    // Here you would typically validate the username and password against your database
    if (username === 'user' && password === 'password') {
      return { user: username };
    }

    throw new Error('Invalid credentials');
  }),
  'form'
);

export async function isLoggedIn(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );
  const user = session.get('user');
  if (user) {
    return { user };
  }

  return undefined;
}

export async function requireLogin(request: Request) {
  const userSession = await isLoggedIn(request);
  if (!userSession) {
    throw redirect(href('/signin'));
  }
  return userSession;
}

export async function signIn(request: Request): Promise<string> {
  const userSession = await auth.authenticate('form', request);

  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );
  session.set('user', userSession.user);
  throw redirect(href('/'), {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

export async function signOut(request: Request): Promise<never> {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );
  throw redirect(href('/'), {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}
