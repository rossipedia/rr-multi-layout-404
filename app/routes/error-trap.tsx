import { Outlet } from 'react-router';

export default function ErrorTrap() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return (
    <div className="flex flex-col items-center justify-center bg-red-100 min-w-sm card p-4 shadow-md mt-4">
      <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
      <p className="mt-4 text-lg text-red-500">
        An unexpected error has occurred. Please try again later.
      </p>
    </div>
  );
}
