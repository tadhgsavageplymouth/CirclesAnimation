import csv
import json
import re
from collections import defaultdict
from itertools import combinations

def extract_hashtags(text):
    return set(re.findall(r"#\w+", text.lower()))

def process_video_data(csv_file_path, output_json_path):
    hashtag_data = {}
    co_occurrence = defaultdict(set)

    with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Skip header
        for row in reader:
            video_name = row[0]
            video_description = row[1]
            view_count = int(row[4])

            hashtags = extract_hashtags(video_name + " " + video_description)
            for tag in hashtags:
                if tag not in hashtag_data:
                    hashtag_data[tag] = {
                        "viewCountSum": 0,
                        "videoCount": 0
                    }
                hashtag_data[tag]["viewCountSum"] += view_count
                hashtag_data[tag]["videoCount"] += 1

            # Track co-occurrence relationships
            for tag1, tag2 in combinations(hashtags, 2):
                co_occurrence[tag1].add(tag2)
                co_occurrence[tag2].add(tag1)

    # Finalize data
    output_data = []
    for tag, data in hashtag_data.items():
        output_data.append({
            "hashtag": tag,
            "viewCountSum": data["viewCountSum"],
            "videoCount": data["videoCount"],
            "links": list(co_occurrence.get(tag, []))
        })

    # Write JSON
    with open(output_json_path, "w", encoding="utf-8") as outfile:
        json.dump(output_data, outfile, indent=2)

# Example usage:
# process_video_data("videos.csv", "hashtags.json")
