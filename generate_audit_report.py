"""
generate_audit_report.py – N100 Financial Intelligence Platform Sprint 1
==========================================================================
Generates a comprehensive HTML audit report covering:
  1. ETL Load Audit   – rows read/loaded/rejected per dataset
  2. DQ Rule Results  – pass/fail per rule across all datasets
  3. KPI Summary      – computed financial ratios statistics
  4. Data Inventory   – row counts per table

Usage:
    python generate_audit_report.py

Output:
    reports/sprint1_audit_report.html
"""
from __future__ import annotations

import sys
from pathlib import Path
from datetime import datetime
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(PROJECT_ROOT / "src"))

REPORTS_DIR = PROJECT_ROOT / "reports"


# ─────────────────────────────────────────────────────────────────────────────
# Data loaders
# ─────────────────────────────────────────────────────────────────────────────
def _read_csv(name: str) -> pd.DataFrame:
    path = REPORTS_DIR / name
    if path.exists():
        return pd.read_csv(path)
    return pd.DataFrame()


def load_data():
    load_audit      = _read_csv("load_audit.csv")
    dq_report       = _read_csv("validation_report.csv")
    dq_failures     = _read_csv("validation_failures.csv")
    computed_ratios = _read_csv("financial_ratios_computed.csv")
    return load_audit, dq_report, dq_failures, computed_ratios


# ─────────────────────────────────────────────────────────────────────────────
# HTML helpers
# ─────────────────────────────────────────────────────────────────────────────
def _df_to_html(df: pd.DataFrame, max_rows: int = 200) -> str:
    if df.empty:
        return "<p><em>No data available.</em></p>"
    return df.head(max_rows).to_html(
        index=False,
        border=0,
        classes="data-table",
        na_rep="–",
    )


def _kpi_cards(df: pd.DataFrame) -> str:
    if df.empty:
        return "<p><em>No KPI data available. Run python run_ratios.py first.</em></p>"

    kpi_meta = [
        ("net_profit_margin",          "Net Profit Margin",          "%"),
        ("operating_profit_margin",    "Operating Profit Margin",    "%"),
        ("return_on_equity",           "Return on Equity",           "%"),
        ("return_on_capital_employed", "Return on Capital Employed", "%"),
        ("return_on_assets",           "Return on Assets",           "%"),
        ("debt_to_equity",             "Debt-to-Equity",             "x"),
        ("interest_coverage_ratio",    "Interest Coverage Ratio",    "x"),
        ("asset_turnover",             "Asset Turnover",             "x"),
    ]
    cards = ""
    for col, label, unit in kpi_meta:
        if col not in df.columns:
            continue
        series = pd.to_numeric(df[col], errors="coerce").dropna()
        if series.empty:
            continue
        multiplier = 100 if unit == "%" else 1
        mean_v = series.mean() * multiplier
        med_v  = series.median() * multiplier
        min_v  = series.min() * multiplier
        max_v  = series.max() * multiplier
        cards += f"""
        <div class="kpi-card">
          <div class="kpi-label">{label}</div>
          <div class="kpi-value">{mean_v:.2f}{unit}</div>
          <div class="kpi-sub">
            Median {med_v:.2f}{unit} &nbsp;|&nbsp;
            Min {min_v:.2f}{unit} &nbsp;|&nbsp;
            Max {max_v:.2f}{unit}
          </div>
        </div>"""
    return f'<div class="kpi-grid">{cards}</div>'


def _dq_summary_cards(dq: pd.DataFrame) -> str:
    if dq.empty:
        return ""
    total  = len(dq)
    passed = int((dq["Status"] == "PASS").sum()) if "Status" in dq.columns else 0
    failed = total - passed
    rate   = round(passed / total * 100, 1) if total else 0
    colour = "#22c55e" if rate >= 90 else "#f59e0b" if rate >= 70 else "#ef4444"
    return f"""
    <div class="summary-row">
      <div class="stat-card"><div class="stat-num">{total}</div><div class="stat-lbl">Total Checks</div></div>
      <div class="stat-card pass"><div class="stat-num">{passed}</div><div class="stat-lbl">Passed</div></div>
      <div class="stat-card fail"><div class="stat-num">{failed}</div><div class="stat-lbl">Failed</div></div>
      <div class="stat-card" style="border-top:4px solid {colour}">
        <div class="stat-num" style="color:{colour}">{rate}%</div>
        <div class="stat-lbl">Pass Rate</div>
      </div>
    </div>"""


def _etl_summary_cards(audit: pd.DataFrame) -> str:
    if audit.empty:
        return ""
    total_rows  = audit["Rows Loaded"].sum() if "Rows Loaded" in audit.columns else 0
    datasets    = len(audit)
    success     = int((audit["Status"] == "SUCCESS").sum()) if "Status" in audit.columns else 0
    failed      = datasets - success
    return f"""
    <div class="summary-row">
      <div class="stat-card"><div class="stat-num">{datasets}</div><div class="stat-lbl">Datasets</div></div>
      <div class="stat-card pass"><div class="stat-num">{success}</div><div class="stat-lbl">Succeeded</div></div>
      <div class="stat-card fail"><div class="stat-num">{failed}</div><div class="stat-lbl">Failed</div></div>
      <div class="stat-card"><div class="stat-num">{total_rows:,}</div><div class="stat-lbl">Total Rows Loaded</div></div>
    </div>"""


# ─────────────────────────────────────────────────────────────────────────────
# HTML template
# ─────────────────────────────────────────────────────────────────────────────
CSS = """
<style>
  :root{--bg:#0f172a;--card:#1e293b;--border:#334155;--text:#e2e8f0;--muted:#94a3b8;--accent:#6366f1;--green:#22c55e;--red:#ef4444;--yellow:#f59e0b}
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--bg);color:var(--text);font-family:'Segoe UI',system-ui,sans-serif;font-size:14px;line-height:1.6}
  header{background:linear-gradient(135deg,#1e1b4b,#312e81);padding:2rem 3rem;border-bottom:1px solid var(--border)}
  header h1{font-size:1.8rem;font-weight:700;color:#fff;letter-spacing:-.5px}
  header p{color:#a5b4fc;margin-top:.3rem}
  .badge{display:inline-block;padding:.2rem .7rem;border-radius:999px;font-size:.75rem;font-weight:600;background:#312e81;color:#a5b4fc;margin-left:.5rem}
  nav{display:flex;gap:.5rem;padding:1rem 3rem;background:var(--card);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100}
  nav a{color:var(--muted);text-decoration:none;padding:.4rem .9rem;border-radius:6px;transition:.2s}
  nav a:hover{background:var(--border);color:var(--text)}
  main{padding:2rem 3rem;max-width:1400px;margin:auto}
  section{margin-bottom:3rem}
  h2{font-size:1.2rem;font-weight:700;color:#fff;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:1px solid var(--border)}
  h3{font-size:1rem;color:var(--muted);margin:.5rem 0}
  .summary-row{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:1.5rem}
  .stat-card{background:var(--card);border:1px solid var(--border);border-top:4px solid var(--accent);border-radius:10px;padding:1rem 1.5rem;min-width:140px}
  .stat-card.pass{border-top-color:var(--green)}
  .stat-card.fail{border-top-color:var(--red)}
  .stat-num{font-size:1.8rem;font-weight:700;color:#fff}
  .stat-lbl{color:var(--muted);font-size:.8rem;text-transform:uppercase;letter-spacing:.05em}
  .kpi-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem;margin-bottom:1.5rem}
  .kpi-card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:1.2rem;border-left:4px solid var(--accent)}
  .kpi-label{color:var(--muted);font-size:.8rem;text-transform:uppercase;letter-spacing:.05em;margin-bottom:.3rem}
  .kpi-value{font-size:1.6rem;font-weight:700;color:#fff}
  .kpi-sub{color:var(--muted);font-size:.75rem;margin-top:.3rem}
  .table-wrap{overflow-x:auto;border:1px solid var(--border);border-radius:10px}
  table.data-table{width:100%;border-collapse:collapse;font-size:.82rem}
  table.data-table th{background:#1e293b;color:var(--muted);padding:.6rem 1rem;text-align:left;border-bottom:1px solid var(--border);position:sticky;top:0}
  table.data-table td{padding:.5rem 1rem;border-bottom:1px solid #1e293b;color:var(--text)}
  table.data-table tr:hover td{background:#1e293b}
  .pass-cell{color:var(--green);font-weight:600}
  .fail-cell{color:var(--red);font-weight:600}
  footer{text-align:center;color:var(--muted);padding:2rem;border-top:1px solid var(--border);font-size:.8rem}
</style>
"""

def _colour_status(html: str) -> str:
    html = html.replace(">PASS<", ' class="pass-cell">PASS<')
    html = html.replace(">FAIL<", ' class="fail-cell">FAIL<')
    html = html.replace(">SUCCESS<", ' class="pass-cell">SUCCESS<')
    html = html.replace(">FAILED<", ' class="fail-cell">FAILED<')
    return html


def build_report(load_audit, dq_report, dq_failures, computed_ratios) -> str:
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # DQ pass/fail by rule
    dq_by_rule = pd.DataFrame()
    if not dq_report.empty and "Rule ID" in dq_report.columns and "Status" in dq_report.columns:
        dq_by_rule = (
            dq_report.groupby(["Rule ID", "Rule", "Severity", "Status"])
            .size().reset_index(name="Count")
            .sort_values(["Rule ID", "Status"])
        )

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>N100 Financial Intelligence Platform – Sprint 1 Audit Report</title>
  {CSS}
</head>
<body>
<header>
  <h1>N100 Financial Intelligence Platform <span class="badge">Sprint 1</span></h1>
  <p>Audit Report &nbsp;·&nbsp; Generated: {now}</p>
</header>
<nav>
  <a href="#etl">ETL Audit</a>
  <a href="#dq">Data Quality</a>
  <a href="#kpi">KPI Summary</a>
  <a href="#failures">DQ Failures</a>
</nav>
<main>

<!-- ── ETL AUDIT ──────────────────────────────────────────────── -->
<section id="etl">
  <h2>📥 ETL Load Audit</h2>
  {_etl_summary_cards(load_audit)}
  <div class="table-wrap">
    {_colour_status(_df_to_html(load_audit))}
  </div>
</section>

<!-- ── DQ SUMMARY ────────────────────────────────────────────── -->
<section id="dq">
  <h2>🔍 Data Quality – Rule Results</h2>
  {_dq_summary_cards(dq_report)}
  <h3>By Rule</h3>
  <div class="table-wrap">
    {_colour_status(_df_to_html(dq_by_rule))}
  </div>
  <br>
  <h3>Full DQ Report (first 200 rows)</h3>
  <div class="table-wrap">
    {_colour_status(_df_to_html(dq_report))}
  </div>
</section>

<!-- ── KPI SUMMARY ───────────────────────────────────────────── -->
<section id="kpi">
  <h2>📊 Financial KPI Summary</h2>
  {_kpi_cards(computed_ratios)}
  {"" if computed_ratios.empty else f'<h3>Sample Computed Ratios (first 200 rows)</h3><div class="table-wrap">{_df_to_html(computed_ratios)}</div>'}
</section>

<!-- ── DQ FAILURES ───────────────────────────────────────────── -->
<section id="failures">
  <h2>⚠️ DQ Validation Failures</h2>
  <div class="table-wrap">
    {_colour_status(_df_to_html(dq_failures))}
  </div>
</section>

</main>
<footer>N100 Financial Intelligence Platform &nbsp;·&nbsp; Sprint 1 &nbsp;·&nbsp; {now}</footer>
</body>
</html>"""
    return html


# ─────────────────────────────────────────────────────────────────────────────
# Entry point
# ─────────────────────────────────────────────────────────────────────────────
def main():
    print("Loading report data...")
    load_audit, dq_report, dq_failures, computed_ratios = load_data()

    print(f"  ETL audit rows   : {len(load_audit)}")
    print(f"  DQ report rows   : {len(dq_report)}")
    print(f"  DQ failures rows : {len(dq_failures)}")
    print(f"  KPI rows         : {len(computed_ratios)}")

    html = build_report(load_audit, dq_report, dq_failures, computed_ratios)

    out = REPORTS_DIR / "sprint1_audit_report.html"
    out.write_text(html, encoding="utf-8")
    print(f"\n✅ Audit report generated: {out}")
    print(f"   Open in browser: file:///{out.as_posix()}")


if __name__ == "__main__":
    main()
