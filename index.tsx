import type { ComponentProps } from "react";
import { generateDefinition } from "./helpers/generateDefinition";
import { generateId } from "./helpers/generateId";
import { pointsToString, type Point } from "./helpers/point";
export * from "./helpers/point";

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export function animateMotion(
  opts: ComponentProps<"animateMotion">,
  ...hrefs: string[]
) {
  const id = generateId({ animateMotion: { opts } });
  return generateDefinition(
    id,
    <animateMotion {...opts} id={id}>
      {hrefs.map((href) => (
        <mpath href={href} />
      ))}
    </animateMotion>
  );
}
export function path(path: string, opts?: ComponentProps<"path">) {
  const id = generateId({ path: { path, opts } });
  return generateDefinition(id, <path {...opts} id={id} d={path} />);
}
export function polygon(points: Point[], opts?: ComponentProps<"polygon">) {
  const id = generateId({ polygon: { points, opts } });
  return generateDefinition(
    id,
    <polygon {...opts} id={id} points={pointsToString(points)} />
  );
}
export function polyline(points: Point[], opts?: ComponentProps<"polyline">) {
  const id = generateId({ polyline: { points, opts } });
  return generateDefinition(
    id,
    <polyline {...opts} id={id} points={pointsToString(points)} />
  );
}
export function stop(
  offset: number,
  opts: WithRequired<ComponentProps<"stop">, "stopColor">
) {
  const id = generateId({ stop: { offset, opts } });
  return generateDefinition(id, <stop {...opts} id={id} offset={offset} />);
}
export function text(
  text: string,
  opts: WithRequired<ComponentProps<"text">, "x" | "y">
) {
  const id = generateId({ text: { text, opts } });
  return generateDefinition(
    id,
    <text {...opts} id={id}>
      {text}
    </text>
  );
}
export function tspan(text: string, opts: ComponentProps<"tspan">) {
  const id = generateId({ tspan: { text, opts } });
  return generateDefinition(
    id,
    <tspan {...opts} id={id}>
      {text}
    </tspan>
  );
}

function generateStdSvgElement<N extends keyof JSX.IntrinsicElements>(Name: N) {
  return function StdSvgElement<R extends keyof ComponentProps<N> = never>(
    opts: WithRequired<ComponentProps<N>, R>,
    ...hrefs: string[]
  ) {
    const id = generateId({ [Name]: { opts, hrefs } });

    return generateDefinition(
      id,
      // @ts-ignore
      <Name {...opts} id={id}>
        {hrefs.map((href, idx) => (
          <use key={idx} href={href} />
        ))}
      </Name>
    );
  };
}

export const clipPath = generateStdSvgElement("clipPath");
export const g = generateStdSvgElement("g");
export const mask = generateStdSvgElement("mask");
export const symbol = generateStdSvgElement("symbol");
export const marker = generateStdSvgElement("marker")<
  "refX" | "refY" | "markerWidth" | "markerHeight"
>;
export const ellipse = generateStdSvgElement("ellipse")<
  "cx" | "cy" | "rx" | "ry"
>;
export const circle = generateStdSvgElement("circle")<"cx" | "cy" | "r">;
export const line = generateStdSvgElement("line")<"x1" | "y1" | "x2" | "y2">;
export const rect = generateStdSvgElement("rect")<
  "x" | "y" | "width" | "height"
>;
export const pattern = generateStdSvgElement("pattern")<
  "x" | "y" | "width" | "height"
>;
export const linearGradient = generateStdSvgElement("linearGradient");
export const radialGradient = generateStdSvgElement("radialGradient");

function generateSingleSvgElement<N extends keyof JSX.IntrinsicElements>(
  Name: N
) {
  return function StdSvgElement<R extends keyof ComponentProps<N> = never>(
    opts: WithRequired<ComponentProps<N>, R>
  ) {
    const id = generateId({ [Name]: { opts } });

    return generateDefinition(
      id,
      // @ts-ignore
      <Name {...opts} id={id} />
    );
  };
}

export const animate = generateSingleSvgElement("animate");
export const animateTransform = generateSingleSvgElement("animateTransform");
