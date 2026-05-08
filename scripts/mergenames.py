import os
import json
import re

INPUT_FOLDER = "src/lib/data/names/first"
OUTPUT_FILE = "src/lib/data/names/first_names.json"

pattern = re.compile(r"firstnames_(\d{4})\.json$")

merged_data = {}

for filename in os.listdir(INPUT_FOLDER):
    match = pattern.match(filename)

    if match:
        year = match.group(1)
        filepath = os.path.join(INPUT_FOLDER, filename)

        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

        merged_data[year] = data

merged_data = dict(sorted(merged_data.items(), key=lambda x: int(x[0])))

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(merged_data, f, indent=2)

print(f"Merged {len(merged_data)} files into {OUTPUT_FILE}")