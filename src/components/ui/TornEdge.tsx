import styles from "./ui.module.css";

/** Irregular torn-paper top edge. Deterministic, so server and client markup match. */
function tornPolygon(seed: number): string {
  let s = seed;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const points = ["0% 100%"];
  let x = 0;
  while (x < 100) {
    x = Math.min(100, x + 0.8 + rnd() * 2.2);
    points.push(`${x.toFixed(2)}% ${(rnd() * 70).toFixed(1)}%`);
  }
  points.push("100% 100%");
  return `polygon(${points.join(",")})`;
}

export function TornEdge({ seed = 7 }: { seed?: number }) {
  return <div className={styles.torn} style={{ clipPath: tornPolygon(seed) }} aria-hidden="true" />;
}
