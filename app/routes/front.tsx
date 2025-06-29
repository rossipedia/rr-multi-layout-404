import { Outlet } from 'react-router';

export default function FrontLayout() {
  return (
    <div className="flex-1 flex flex-col gap-2 items-start">
      <h1>Front</h1>
      <Outlet />
    </div>
  );
}
