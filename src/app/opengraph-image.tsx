import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logoData = await readFile(join(process.cwd(), "public/logo.png"));
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#005b3f",
        gap: 24,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoBase64} width={500} height={273} alt="" />
      <div
        style={{
          fontSize: 28,
          color: "#dfc98f",
          fontWeight: 600,
        }}
      >
        Соняшникова та ріпакова олія власного виробництва
      </div>
    </div>,
    { ...size },
  );
}
