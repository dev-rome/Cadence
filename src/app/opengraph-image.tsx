import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Cadence — Incident response for small engineering teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0A0A0B",
        padding: 80,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            background: "#22c55e",
          }}
        />
        <div style={{ fontSize: 28, color: "#a1a1aa" }}>
          Incident response for small teams
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          color: "#fafafa",
          lineHeight: 1.05,
          letterSpacing: -2,
        }}
      >
        <div style={{ display: "flex" }}>Know first. Fix faster.</div>
        <div style={{ display: "flex" }}>Tell everyone.</div>
      </div>

      <div style={{ display: "flex", fontSize: 32, color: "#fafafa" }}>
        Cadence
      </div>
    </div>,
    { ...size },
  );
}
