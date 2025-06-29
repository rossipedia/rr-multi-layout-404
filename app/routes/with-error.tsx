export function loader() {
  throw new Error('This is a test error');
}

export default function PageWithError() {
  // will never be rendered
  return null;
}