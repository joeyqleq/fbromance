from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ADAPTER = ROOT / "src" / "data" / "poison-dashboard.ts"


def main() -> None:
    assert ADAPTER.exists(), f"missing adapter: {ADAPTER}"
    source = ADAPTER.read_text()
    required_exports = [
        "poisonOverview",
        "poisonSpikeMonths",
        "poisonEventTimeline",
        "poisonReviewQueue",
        "poisonDenseThreads",
        "poisonTopInteractions",
        "poisonFlairBreakdown",
    ]
    for name in required_exports:
        assert name in source, f"missing export {name}"


if __name__ == "__main__":
    main()
