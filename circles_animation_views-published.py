import matplotlib.pyplot as plt
from matplotlib.patches import Circle
from matplotlib.animation import FuncAnimation
import numpy as np
import pandas as pd
from datetime import datetime

# Load YouTube videos data from CSV file
csv_file = '/Users/tadhgsavage/Pedro_Project/Circles/youtube_videos.csv'
df = pd.read_csv(csv_file)

# Normalise the viewCount for visualisation
df['viewCount'] = df['viewCount'] / df['viewCount'].max() * 10  # Scale viewCount to a maximum of 10 for circle size

# Convert the publishedAt column to datetime objects
df['publishedAt'] = pd.to_datetime(df['publishedAt'])

# Get the current date for calculating the time since publication
current_date = datetime.now()

# Calculate the number of days since the video was published
df['days_since_published'] = (current_date - df['publishedAt']).dt.days

# Set up the figure and axis
fig, ax = plt.subplots()
ax.set_aspect('equal')
ax.set_xlim(-15, 15)
ax.set_ylim(-15, 15)

# Generate a list of circles representing each video
circles = []
initial_radii = []

for index, row in df.iterrows():
    # Create circles: size is initially very small and will grow based on the view count and days since published
    circle = Circle((np.random.uniform(-10, 10), np.random.uniform(-10, 10)),
                    radius=0.01, edgecolour='black', facecolour='lightgreen', alpha=0.7)
    circles.append(circle)
    initial_radii.append(row['viewCount'])
    ax.add_patch(circle)

# Animation function to update circle radii over time
def update(frame):
    for i, circle in enumerate(circles):
        # Growth rate inversely proportional to days since publication (newer videos grow faster)
        growth_rate = initial_radii[i] / (df.iloc[i]['days_since_published'] + 1)  # Adding 1 to avoid division by zero
        circle.radius = min(initial_radii[i], circle.radius + growth_rate * 0.01)  # Cap the radius at viewCount value
    return circles

# Create the animation
ani = FuncAnimation(fig, update, frames=300, interval=100, blit=False)

# Display the animation
plt.show()
