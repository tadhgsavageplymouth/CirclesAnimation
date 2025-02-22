// script4.js

function sketch4(p) {
    // Initialize sample data
    let videos = [
        {title: "Video 1", viewCount: 100000, growthRate: 500, x: p.random(100, p.width - 100), y: p.random(100, p.height - 100), vx: p.random(-0.5, 0.5), vy: p.random(-0.5, 0.5), color: [173, 216, 230]},
        {title: "Video 2", viewCount: 500000, growthRate: 800, x: p.random(100, p.width - 100), y: p.random(100, p.height - 100), vx: p.random(-0.5, 0.5), vy: p.random(-0.5, 0.5), color: [255, 182, 193]},
        {title: "Video 3", viewCount: 200000, growthRate: 200, x: p.random(100, p.width - 100), y: p.random(100, p.height - 100), vx: p.random(-0.5, 0.5), vy: p.random(-0.5, 0.5), color: [255, 222, 173]},
        {title: "Video 4", viewCount: 300000, growthRate: 1000, x: p.random(100, p.width - 100), y: p.random(100, p.height - 100), vx: p.random(-0.5, 0.5), vy: p.random(-0.5, 0.5), color: [144, 238, 144]}
    ];

    p.setup = function() {
        p.createCanvas(600, 600);
        p.frameRate(30);
    };

    p.draw = function() {
        p.background(255);

        // Draw each video as a moving, growing bubble
        for (let video of videos) {
            // Update view count over time based on growth rate
            video.viewCount += video.growthRate;

            // Calculate size based on viewCount, ensuring max size cap
            video.size = p.map(video.viewCount, 0, 1000000, 10, 100);

            // Draw the bubble with a color based on video data
            p.fill(video.color[0], video.color[1], video.color[2], 200); // Base color with some transparency
            p.stroke(0);
            p.ellipse(video.x, video.y, video.size);

            // Label with view count and title
            p.fill(0);
            p.noStroke();
            p.textSize(12);
            p.textAlign(p.CENTER);
            p.text(`${video.title}\n${video.viewCount.toFixed(0)} views`, video.x, video.y + video.size / 4);

            // Update position based on velocity
            video.x += video.vx;
            video.y += video.vy;

            // Bounce off walls
            if (video.x - video.size / 2 < 0 || video.x + video.size / 2 > p.width) video.vx *= -1;
            if (video.y - video.size / 2 < 0 || video.y + video.size / 2 > p.height) video.vy *= -1;

            // Add subtle pulsation effect
            video.size += p.sin(p.frameCount * 0.1) * 0.5;
        }
    };
}

// Attach the sketch to the HTML element with id 'sketch4'
new p5(sketch4, 'sketch4');
