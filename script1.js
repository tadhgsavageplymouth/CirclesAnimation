function sketch1(p) {
    // Sample data representing YouTube videos
    let data = [
        {viewCount: 100000, length: 5},   // viewCount, length in minutes
        {viewCount: 500000, length: 10},
        {viewCount: 200000, length: 3},
        {viewCount: 800000, length: 8},
        {viewCount: 300000, length: 6}
    ];

    let circles = [];
    let maxViewCount = Math.max(...data.map(d => d.viewCount));

    // Normalize viewCount for visualization
    data.forEach(d => {
        d.viewCountNorm = d.viewCount / maxViewCount * 10; // Scale to max of 10
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
                growthRate: d.viewCountNorm / (d.length + 1) * 0.01, // Avoid division by zero
                faceColor: p.color(173, 216, 230, 180), // Light blue with alpha
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

// Attach the sketch to the HTML element with id 'sketch1'
new p5(sketch1, 'sketch1');
