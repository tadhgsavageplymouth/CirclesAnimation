import matplotlib.pyplot as plt
from matplotlib.patches import Circle
from matplotlib.animation import FuncAnimation

# Set up the figure and axis
fig, ax = plt.subplots()
ax.set_aspect('equal')
ax.set_xlim(-10, 10)
ax.set_ylim(-10, 10)

# Create two circles with initial small radii
circle1 = Circle((-5, 0), 0.5, color='blue', fill=False)
circle2 = Circle((5, 0), 0.5, color='red', fill=False)

# Add circles to the plot
ax.add_patch(circle1)
ax.add_patch(circle2)

# Animation function
def animate(i):
    # Slower radius growth
    new_radius = 0.5 + i / 50.0  # Reduced the growth rate
    circle1.set_radius(new_radius)
    circle2.set_radius(new_radius)
    
    # Move the circles towards each other, half overlap
    max_overlap_distance = 2  # Maximum overlap at half distance
    circle1.set_center((-5 + (i / 100.0) * max_overlap_distance, 0))
    circle2.set_center((5 - (i / 100.0) * max_overlap_distance, 0))
    
    return circle1, circle2

# Create animation with repeat=True to loop
anim = FuncAnimation(fig, animate, frames=200, interval=100, repeat=True)

# Show the animation
plt.show()
