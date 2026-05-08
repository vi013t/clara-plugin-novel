import json
import csv
import sys

# Usage:
# python convert.py input.txt output.json

def gen(input_file, output_file):
    data = []

    with open(input_file, newline='', encoding='utf-8') as f:
        reader = csv.reader(f)

        for row in reader:
            if not row:
                continue

            name, sex, count = row

            data.append({
                "name": name,
                "sex": sex,
                "count": int(count)
            })

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    print(f"Wrote {len(data)} records to {output_file}")

for year in range(1880, 2025):
    gen(f"src/lib/data/yob{year}.txt", f"src/lib/data/firstnames_{year}.json")