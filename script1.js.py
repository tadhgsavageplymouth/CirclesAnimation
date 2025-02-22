## script1.js.py

import matplotlib.pyplot as plt
from matplotlib.patches import Circle
from matplotlib.animation import FuncAnimation
import numpy as np
import pandas as pd

# Load YouTube videos data from CSV file
csv_file = '/Users/tadhgsavage/Pedro_Project/Circles/youtube_videos.csv'
df = pd.read_csv(csv_file)

# Normalise the viewCount for visualisation
df['viewCount'] = df['viewCount'] / df['viewCount'].max() * 10  # Scale viewCount to a maximum of 10 for circle size
df['length'] = df['length'].apply(lambda x: float(x.split()[0]))  # Convert length from "minutes" to float

# Set up the figure and axis
fig, ax = plt.subplots()
ax.set_aspect('equal')
ax.set_xlim(-15, 15)
ax.set_ylim(-15, 15)

# Generate a list of circles representing each video
circles = []
initial_radii = []

for index, row in df.iterrows():
    # Create circles: size is initially very small and will grow based on the view count and length
    circle = Circle((np.random.uniform(-10, 10), np.random.uniform(-10, 10)),
                    radius=0.01, edgecolour='black', facecolour='lightblue', alpha=0.7)
    circles.append(circle)
    initial_radii.append(row['viewCount'])
    ax.add_patch(circle)

# Animation function to update circle radii over time
def update(frame):
    for i, circle in enumerate(circles):
        # Circles grow over time at a rate inversely proportional to video length
        growth_rate = initial_radii[i] / (df.iloc[i]['length'] + 1)  # Adding 1 to avoid division by zero
        circle.radius = min(initial_radii[i], circle.radius + growth_rate * 0.01)  # Cap the radius at viewCount value
    return circles

# Create the animation
ani = FuncAnimation(fig, update, frames=300, interval=100, blit=False)

# Display the animation
plt.show()
