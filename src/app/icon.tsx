import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default async function Icon() {
  const iconPath = path.join(process.cwd(), "public", "images", "brand", "secondary_ascii_logo.png");
  const icon = await readFile(iconPath);
  return new Response(icon, {
    headers: {
      "Content-Type": contentType,
    },
  });
}
