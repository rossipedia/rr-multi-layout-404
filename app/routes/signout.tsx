import type { Route } from './+types/signout';

import { signOut } from '~/session.server';

export async function action({ request }: Route.ActionArgs) {
  await signOut(request);
}
