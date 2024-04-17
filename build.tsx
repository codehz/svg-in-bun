import { render } from "./helpers/nowarn";
import { get_defnitions, reset_database } from "./utils/db";

export function getGeneratedSvg() {
  const defs = get_defnitions.values().flat().join("");
  return render(
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs dangerouslySetInnerHTML={{ __html: defs }} />
    </svg>
  );
}
export function resetSvgCache() {
  reset_database.run();
}
