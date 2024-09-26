import matplotlib.pyplot as plt
from matplotlib.patches import Circle
from matplotlib.animation import FuncAnimation

# Set up the figure and axis
fig, ax = plt.subplots()
ax.set_aspect('equal')
ax.set_xlim(-10, 10)
ax.set_ylim(-10, 10)

# Create two circles with larger initial radii and filled color
circle1 = Circle((-5, 0), 2.0, edgecolor='blue', facecolor='lightblue', fill=True)  # Filled blue circle
circle2 = Circle((5, 0), 2.0, edgecolor='red', facecolor='pink', fill=True)  # Filled red circle

# Add circles to the plot
ax.add_patch(circle1)
ax.add_patch(circle2)

# Animation function
def animate(i):
    # Faster radius growth
    new_radius = 2.0 + i / 10.0  # Increased growth rate
    circle1.set_radius(new_radius)
    circle2.set_radius(new_radius)
    
    # Move the circles towards each other for half overlap
    max_overlap_distance = 2  # Maximum overlap at half distance
    circle1.set_center((-5 + (i / 50.0) * max_overlap_distance, 0))  # Faster movement
    circle2.set_center((5 - (i / 50.0) * max_overlap_distance, 0))   # Faster movement
    
    return circle1, circle2

# Create animation with repeat=True to loop
anim = FuncAnimation(fig, animate, frames=100, interval=50, repeat=True)  # Increased speed

# Show the animation
plt.show()
