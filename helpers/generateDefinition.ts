import type { ReactElement } from "react";
import { insert_definition } from "../utils/db";
import { render } from "./nowarn";

export function generateDefinition(hash: string, value: ReactElement) {
  insert_definition.run(hash, render(value));
  return "#" + hash;
}
