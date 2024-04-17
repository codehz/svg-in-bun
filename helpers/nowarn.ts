import type { ReactElement } from "react";
import { renderToString } from "react-dom/server";

/** https://github.com/facebook/react/issues/10415 */
export function render(element: ReactElement) {
  const orig = console.error;
  console.error = () => {};
  const result = renderToString(element);
  console.error = orig;
  return result;
}
