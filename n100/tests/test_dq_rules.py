import sys
from pathlib import Path

# Dynamically add the project root to sys.path so direct script execution works
PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from tests.dq.dq_rules import DQ_RULES

print("=" * 60)
print("DATA QUALITY RULES")
print("=" * 60)

print(f"Total Rules: {len(DQ_RULES)}\n")

for rule_id, rule in DQ_RULES.items():
    print(f"{rule_id} : {rule['name']} [{rule['severity']}]")