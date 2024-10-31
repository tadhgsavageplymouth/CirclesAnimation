import matplotlib.pyplot as plt
from matplotlib.patches import Circle
from matplotlib.animation import FuncAnimation
import numpy as np

# Set up the figure and axis
fig, ax = plt.subplots()
ax.set_aspect('equal')
ax.set_xlim(-10, 10)
ax.set_ylim(-10, 10)

# Create two circles with different growth rates and filled colors
circle1 = Circle((-5, 0), 2.0, edgecolor='blue', facecolor='lightblue', fill=True)  # Filled blue circle
circle2 = Circle((5, 0), 1.5, edgecolor='red', facecolor='pink', fill=True)  # Filled red circle

# Add circles to the plot
ax.add_patch(circle1)
ax.add_patch(circle2)

# Create a variable to hold a single small popped circle and its velocity
popped_circle = None
velocity = np.array([0, 0])  # Initialize velocity for the popped circle
has_popped = False  # Variable to track if a circle has already popped

# Function to create a new circle that "pops" in a random direction with an initial velocity
def create_popped_circle(center):
    global popped_circle, velocity  # Access the global variables
    angle = np.random.uniform(0, 2 * np.pi)  # Random angle for direction
    distance = 2.0  # Fixed distance to pop out
    new_center = (center[0] + distance * np.cos(angle), center[1] + distance * np.sin(angle))
    popped_circle = Circle(new_center, 0.5, edgecolor='green', facecolor='lightgreen', fill=True)  # Small green circle
    ax.add_patch(popped_circle)
    
    # Set a random velocity for the popped circle
    velocity = np.random.uniform(-0.2, 0.2, size=2)

# Function to move the popped circle and make it "float" and "flow around"
def move_popped_circle():
    global velocity

    # Move the circle based on the velocity
    new_pos = np.array(popped_circle.center) + velocity

    # Bounce off the walls if it hits the edges
    if new_pos[0] - popped_circle.radius < -10 or new_pos[0] + popped_circle.radius > 10:
        velocity[0] = -velocity[0]  # Reverse horizontal direction
    if new_pos[1] - popped_circle.radius < -10 or new_pos[1] + popped_circle.radius > 10:
        velocity[1] = -velocity[1]  # Reverse vertical direction

    # Update the position of the popped circle
    popped_circle.set_center(new_pos)

# Animation function
def animate(i):
    global has_popped

    # Different growth rates for each circle
    radius1 = 2.0 + i / 50.0  # Circle 1 grows faster
    radius2 = 1.5 + i / 70.0  # Circle 2 grows slower
    
    circle1.set_radius(radius1)
    circle2.set_radius(radius2)
    
    # Move the circles towards each other
    max_overlap_distance = 2  # Maximum overlap at half distance
    circle1.set_center((-5 + (i / 50.0) * max_overlap_distance, 0))  # Faster movement
    circle2.set_center((5 - (i / 50.0) * max_overlap_distance, 0))   # Faster movement
    
    # Detect interception (when the circles overlap)
    distance_between_centers = np.linalg.norm(np.array(circle1.center) - np.array(circle2.center))
    if distance_between_centers < (circle1.radius + circle2.radius):
        # Calculate the center of overlap
        overlap_center_x = (circle1.center[0] + circle2.center[0]) / 2
        
        # Pop a new small circle in a random direction if not already popped
        if not has_popped:  # Only create the circle once
            create_popped_circle((overlap_center_x, 0))
            has_popped = True  # Mark that the circle has popped

    # Move the popped circle (make it "float" and "flow around")
    if popped_circle:
        move_popped_circle()

    return circle1, circle2, popped_circle if popped_circle else None

# Create animation with repeat=True to loop
anim = FuncAnimation(fig, animate, frames=200, interval=50, repeat=True)

# Show the animation
plt.show()
