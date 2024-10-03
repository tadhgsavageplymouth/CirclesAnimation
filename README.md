# Floating Circles Animation

This Python project creates an animation of two circles growing at different rates, moving toward each other until they overlap. Upon overlap, a small circle "pops" out in a random direction and floats around the screen, bouncing off the edges. The animation repeats in a loop.

## Features
- Two circles that grow at different rates.
- Circles move toward each other and overlap.
- When the circles intersect, a small green circle pops out in a random direction.
- The popped circle floats around, bouncing off the edges of the screen.
  
## Requirements
To run this project, you need to have the following Python packages installed:
- `matplotlib`
- `numpy`

You can install these dependencies using `pip`:
```bash
pip install matplotlib numpy
```
## Running the Script
To run the animation, simply execute the Python script in your terminal:
```
python your_script_name.py
```
The animation will open in a new window, where you can observe the behaviour of the circles.
## How it Works
- Growing Circles: The two main circles are created with different initial sizes. They grow at different rates as they move towards each other.

- Circle Overlap: Once the two circles overlap, the script calculates the point of interception and spawns a new small circle.

- Floating Circle: The small circle "pops" out in a random direction and begins to move around the screen with a constant velocity. If it hits the boundaries of the plot, it will bounce off the walls and continue floating.

## Customisation
- Circle Sizes and Growth Rates: You can adjust the initial sizes and growth rates of the circles by changing the radius1 and radius2 variables in the animate function.

- Popped Circle Behaviour: The movement speed and behaviour of the popped circle can be adjusted by modifying the velocity array in the create_popped_circle() function.




