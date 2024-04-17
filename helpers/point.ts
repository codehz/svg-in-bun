
export type Point = [number, number];

export function pointsToString(points: Point[]) {
  return points.map((p) => p.join(",")).join(" ");
}