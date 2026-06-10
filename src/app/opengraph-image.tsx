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
            "radial-gradient(circle at 14% 82%, rgba(0,251,251,0.18), transparent 26%), radial-gradient(circle at 78% 8%, rgba(255,171,243,0.2), transparent 20%), radial-gradient(circle at 65% 30%, rgba(255,0,255,0.2), transparent 18%), linear-gradient(160deg, #0c0e0f 0%, #121415 55%, #0c0e0f 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(255,171,243,0.08)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760 }}>
            <div
              style={{
                fontSize: 28,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#00fbfb",
              }}
            >
              evidence dossier
            </div>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 800, letterSpacing: "-0.05em" }}>
              <span style={{ color: "#ffffff" }}>ziopsyop.tech</span>
            </div>
            <div style={{ fontSize: 34, lineHeight: 1.25, color: "#ffffff" }}>
              Investigating timing, rhetoric, and identity-performance patterns around r/ForbiddenBromance.
            </div>
          </div>
          <div
            style={{
              width: 240,
              height: 240,
              border: "1px solid rgba(255,171,243,0.08)",
              background: "rgba(18,20,21,0.85)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 0 60px rgba(255,171,243,0.08)",
            }}
          >
            <div style={{ fontSize: 16, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffabf3" }}>
              archive
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 54, fontWeight: 700 }}>{poisonOverview.comments.toLocaleString()}</div>
              <div style={{ fontSize: 24, color: "#00fbfb" }}>comments</div>
              <div style={{ display: "flex", fontSize: 18, color: "#ffabf3" }}>
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
                border: "1px solid rgba(255,171,243,0.08)",
                background: "linear-gradient(180deg, rgba(18,20,21,0.95), rgba(12,14,15,0.9))",
                padding: 18,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", fontSize: 18, color: "#ffabf3" }}>{item.month}</div>
              <div style={{ display: "flex", fontSize: 42, fontWeight: 700 }}>{item.comments.toLocaleString()}</div>
              <div style={{ display: "flex", fontSize: 18, color: "#ff00ff" }}>comment spike</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
