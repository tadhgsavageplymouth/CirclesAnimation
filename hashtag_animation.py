# hashtag_animation.py

import pygame
import math

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Hashtag Animation with Mapped Values")

# Colors
BACKGROUND_COLOR = (240, 248, 255)  # AliceBlue
HASHTAG_COLOR = (32, 178, 170)      # LightSeaGreen
TEXT_COLOR = (0, 0, 0)              # Black

# Font
FONT = pygame.font.Font(pygame.font.get_default_font(), 18)

# Sample hashtags with view counts
hashtags = [
    {"name": "#coding", "views": 20000},
    {"name": "#AI", "views": 50000},
    {"name": "#machinelearning", "views": 80000},
    {"name": "#python", "views": 30000},
    {"name": "#datascience", "views": 100000},
]

# Derive maximum view count
max_views = max(h["views"] for h in hashtags)

# Calculate derived values for each hashtag
num_rows = math.ceil(math.sqrt(len(hashtags)))  # Create a square grid
num_cols = math.ceil(len(hashtags) / num_rows)
cell_width = WIDTH / num_cols
cell_height = HEIGHT / num_rows

for idx, h in enumerate(hashtags):
    # Map size (20 to 80 pixels) based on view counts
    h["size"] = max(20, int((h["views"] / max_views) * 80))

    # Position hashtags in grid cells
    col = idx % num_cols
    row = idx // num_cols
    h["x"] = (col + 0.5) * cell_width  # Center in cell
    h["y"] = (row + 0.5) * cell_height  # Center in cell

    # Start opacity at 0 for gradual fade-in
    h["opacity"] = 0

# Main loop
running = True
clock = pygame.time.Clock()
while running:
    # Handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Update screen
    screen.fill(BACKGROUND_COLOR)

    # Draw hashtags
    for h in hashtags:
        # Increase opacity gradually
        h["opacity"] = min(255, h["opacity"] + 5)

        # Draw circle
        surface = pygame.Surface((h["size"] * 2, h["size"] * 2), pygame.SRCALPHA)
        pygame.draw.circle(
            surface,
            HASHTAG_COLOR + (h["opacity"],),  # Add opacity as the fourth RGBA value
            (h["size"], h["size"]),
            h["size"]
        )
        screen.blit(surface, (h["x"] - h["size"], h["y"] - h["size"]))

        # Draw text
        text = FONT.render(h["name"], True, TEXT_COLOR)
        screen.blit(text, (h["x"] - text.get_width() // 2, h["y"] - text.get_height() // 2))

    # Update display
    pygame.display.flip()
    clock.tick(30)  # Cap frame rate at 30 FPS

# Quit Pygame
pygame.quit()
