import matplotlib.pyplot as plt
from matplotlib.patches import Circle
from matplotlib.animation import FuncAnimation

# Set up the figure and axis
fig, ax = plt.subplots()
ax.set_aspect('equal')
ax.set_xlim(-10, 10)
ax.set_ylim(-10, 10)

# Create two circles with initial small radii
circle1 = Circle((-3, 0), 0.5, color='blue', fill=False)
circle2 = Circle((3, 0), 0.5, color='red', fill=False)

# Add circles to the plot
ax.add_patch(circle1)
ax.add_patch(circle2)

# Animation function
def animate(i):
    # Increase radius of both circles
    new_radius = i / 10.0
    circle1.set_radius(new_radius)
    circle2.set_radius(new_radius)
    
    # Move the circles towards each other
    circle1.set_center((-3 + i / 20.0, 0))
    circle2.set_center((3 - i / 20.0, 0))
    
    return circle1, circle2

# Create animation
anim = FuncAnimation(fig, animate, frames=100, interval=50)

# Show the animation
plt.show()
