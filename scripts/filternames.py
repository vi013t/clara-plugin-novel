import ijson
import json

INPUT_FILE = "src/lib/data/names/first_names.json"
OUTPUT_FILE = "src/lib/data/names/first_names_min.json"
MIN_COUNT = 100

def stream_filter_json(input_path, output_path, min_count=10):
    with open(input_path, "rb") as infile, open(output_path, "w", encoding="utf-8") as outfile:

        outfile.write("{")

        first_year = True

        for year, entries in ijson.kvitems(infile, ""):

            filtered = []

            for entry in entries:
                try:
                    count = int(entry["count"])
                    if count >= min_count:
                        filtered.append(entry)
                except (KeyError, ValueError, TypeError):
                    continue

            if not first_year:
                outfile.write(",")

            first_year = False

            outfile.write("\n")
            outfile.write(json.dumps(year))
            outfile.write(": ")
            json.dump(filtered, outfile, separators=(",", ":"))

        outfile.write("\n}")


if __name__ == "__main__":
    stream_filter_json(INPUT_FILE, OUTPUT_FILE, MIN_COUNT)
    print(f"Filtered JSON written to {OUTPUT_FILE}")