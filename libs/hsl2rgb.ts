export const version = 'hsl2rgb-v1.0.0';

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; // Normalize hue to range 0-1
  s /= 100; // Normalize saturation to range 0-1
  l /= 100; // Normalize lightness to range 0-1

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // Achromatic (grey)
  } else {
    const hueToRgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Usage example
const h = 200; // Hue value between 0-360
const s = 50; // Saturation value between 0-100
const l = 70; // Lightness value between 0-100

const [red, green, blue] = hslToRgb(h, s, l);
console.log(`RGB: ${red}, ${green}, ${blue}`);

export default hslToRgb;