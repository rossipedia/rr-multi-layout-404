import {
  index,
  layout,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export default [
  layout('routes/_layout.tsx', [
    layout('routes/front.tsx', [
      index('routes/index.tsx'),
      route('signin', 'routes/signin.tsx'),
    ]),
    layout('routes/app.tsx', [
      route('settings', 'routes/settings.tsx'),
      route('dashboard', 'routes/dashboard.tsx'),
    ]),
    route('*', 'routes/404.tsx'),
  ]),
  route('signout', 'routes/signout.tsx'),
] satisfies RouteConfig;
