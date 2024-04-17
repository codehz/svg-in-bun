import { inline_definition } from "../utils/db";

export function inlineDefinition(href: string) {
  const [{ value = `<use href="${href}" />` } = {}] = inline_definition.all(
    href.slice(1)
  );
  return value;
}
