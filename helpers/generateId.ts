import hash from "murmurhash-js";
import stringify from 'fast-json-stable-stringify'

const getAlphabeticChar = (code: number) =>
  String.fromCharCode(code + (code > 25 ? 39 /* 65 - 26 */ : 97));

export function generateId(input: string | object) {
  const code = hash(typeof input === "string" ? input : stringify(input));

  let className = "";
  let x = 0;

  for (x = Math.abs(code); x > 52; x = (x / 52) | 0) {
    className = getAlphabeticChar(x % 52) + className;
  }

  className = getAlphabeticChar(x % 52) + className;

  // replace ad with a_d
  return className.replace(/(a)(d)/gi, "$1_$2");
}
