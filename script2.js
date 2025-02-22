// script2.js

function sketch2(p) {
    // Sample data representing YouTube videos with publication dates
    let data = [
        {viewCount: 100000, publishedAt: '2023-10-01'}, // YYYY-MM-DD
        {viewCount: 500000, publishedAt: '2023-09-15'},
        {viewCount: 200000, publishedAt: '2023-10-20'},
        {viewCount: 800000, publishedAt: '2023-08-30'},
        {viewCount: 300000, publishedAt: '2023-09-25'}
    ];

    let circles = [];
    let maxViewCount = Math.max(...data.map(d => d.viewCount));

    // Calculate days since publication and normalize viewCount
    data.forEach(d => {
        d.viewCountNorm = d.viewCount / maxViewCount * 10; // Scale to max of 10
        d.publishedAtDate = new Date(d.publishedAt);
        let currentDate = new Date();
        d.daysSincePublished = Math.floor((currentDate - d.publishedAtDate) / (1000 * 60 * 60 * 24));
    });

    p.setup = function() {
        p.createCanvas(600, 600);
        p.frameRate(30);

        // Initialize circles
        data.forEach(d => {
            let circle = {
                x: p.random(-10, 10),
                y: p.random(-10, 10),
                radius: 0.01,
                maxRadius: d.viewCountNorm,
                growthRate: d.viewCountNorm / (d.daysSincePublished + 1) * 0.05, // Avoid division by zero
                faceColor: p.color(144, 238, 144, 180), // Light green with alpha
                edgeColor: p.color(0, 0, 0) // Black
            };
            circles.push(circle);
        });
    };

    p.draw = function() {
        p.background(255);

        // Draw and update circles
        circles.forEach(c => {
            c.radius = Math.min(c.maxRadius, c.radius + c.growthRate);
            p.fill(c.faceColor);
            p.stroke(c.edgeColor);
            drawCircle(c.x, c.y, c.radius);
        });
    };

    // Function to map logical coordinates to canvas coordinates
    function drawCircle(logicalX, logicalY, radius) {
        let pixelX = p.map(logicalX, -15, 15, 0, p.width);
        let pixelY = p.map(logicalY, -15, 15, p.height, 0); // Invert y-axis
        let pixelRadius = radius * (p.width / 30); // Since logical units are from -15 to 15
        p.ellipse(pixelX, pixelY, pixelRadius * 2);
    }
}

// Attach the sketch to the HTML element with id 'sketch2'
new p5(sketch2, 'sketch2');
