import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 28% 28%, rgba(183,255,95,0.28), transparent 28%), radial-gradient(circle at 74% 18%, rgba(97,245,255,0.22), transparent 24%), linear-gradient(145deg, #040506 0%, #0b0e15 50%, #05070d 100%)",
          color: "#f5f7ff",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 22,
            borderRadius: 92,
            border: "2px solid rgba(255,255,255,0.08)",
            boxShadow:
              "inset 0 0 0 2px rgba(255,255,255,0.03), 0 0 80px rgba(40,92,255,0.15)",
          }}
        />
        <div
          style={{
            fontSize: 188,
            letterSpacing: "-0.08em",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 8,
            textTransform: "lowercase",
          }}
        >
          <span style={{ color: "#b7ff5f" }}>p</span>
          <span style={{ color: "#ff2cb8" }}>5</span>
        </div>
      </div>
    ),
    size,
  );
}
