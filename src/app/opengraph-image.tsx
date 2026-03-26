import { ImageResponse } from "next/og";
import { poisonOverview, poisonSpikeMonths } from "../data/poison-dashboard";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  const hottestMonth = poisonSpikeMonths[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 56px",
          background:
            "radial-gradient(circle at 14% 82%, rgba(183,255,95,0.22), transparent 26%), radial-gradient(circle at 78% 8%, rgba(97,245,255,0.16), transparent 20%), radial-gradient(circle at 65% 30%, rgba(255,44,184,0.18), transparent 18%), linear-gradient(160deg, #040506 0%, #0b0f18 50%, #09070f 100%)",
          color: "#f6f7fb",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            borderRadius: 42,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760 }}>
            <div
              style={{
                fontSize: 28,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#61f5ff",
              }}
            >
              evidence dossier
            </div>
            <div style={{ display: "flex", fontSize: 94, fontWeight: 800, letterSpacing: "-0.08em" }}>
              <span style={{ color: "#f6f7fb" }}>poi</span>
              <span style={{ color: "#ff2cb8" }}>5</span>
              <span style={{ color: "#f6f7fb" }}>on.m</span>
              <span style={{ color: "#61f5ff" }}>3</span>
            </div>
            <div style={{ fontSize: 36, lineHeight: 1.25, color: "#d8dded" }}>
              Investigating timing, rhetoric, and identity-performance patterns around r/ForbiddenBromance.
            </div>
          </div>
          <div
            style={{
              width: 240,
              height: 240,
              borderRadius: 28,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(10,13,20,0.75)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 0 60px rgba(40,92,255,0.18)",
            }}
          >
            <div style={{ fontSize: 16, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8790a4" }}>
              archive
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 54, fontWeight: 700 }}>{poisonOverview.comments.toLocaleString()}</div>
              <div style={{ fontSize: 24, color: "#b7ff5f" }}>comments</div>
              <div style={{ display: "flex", fontSize: 18, color: "#8790a4" }}>
                hottest month: {hottestMonth.month}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {poisonSpikeMonths.slice(0, 4).map((item) => (
            <div
              key={item.month}
              style={{
                width: 240,
                height: 126,
                borderRadius: 22,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "linear-gradient(180deg, rgba(19,23,34,0.95), rgba(9,12,18,0.85))",
                padding: 18,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", fontSize: 18, color: "#8790a4" }}>{item.month}</div>
              <div style={{ display: "flex", fontSize: 42, fontWeight: 700 }}>{item.comments.toLocaleString()}</div>
              <div style={{ display: "flex", fontSize: 18, color: "#ff2cb8" }}>comment spike</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
