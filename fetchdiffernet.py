import json

# Load the JSON data
with open('updated_json_file1.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    exercises_data = data['exercises']

# Dictionary to store unique values for each key
unique_values = {}

# Keys to exclude
exclude_keys = ['name', 'instructions', 'image']

# Iterate through each exercise object
for exercise in exercises_data:
    # Iterate through each key-value pair in the exercise object
    for key, value in exercise.items():
        # Skip keys to exclude
        if key not in exclude_keys:
            # If the key is not yet in the dictionary, initialize it with an empty set
            if key not in unique_values:
                unique_values[key] = set()
            # Add the value(s) to the set
            if isinstance(value, list):
                unique_values[key].update(value)
            else:
                unique_values[key].add(value)

# Print unique values for each key
for key, values in unique_values.items():
    print(f"{key}: {values}")
