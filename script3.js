function sketch3(p) {
    let circle1 = {
        x: -5,
        y: 0,
        radius: 2.0,
        growthRate: 0.04,
        moveRate: 0.04
    };
    let circle2 = {
        x: 5,
        y: 0,
        radius: 1.5,
        growthRate: 0.02857,
        moveRate: 0.04
    };
    let poppedCircle = null;
    let hasPopped = false;

    p.setup = function() {
        p.createCanvas(600, 600);
        p.frameRate(30);
    };

    p.draw = function() {
        p.background(255);

        // Draw circle1
        p.fill(173, 216, 230); // Light blue
        p.stroke(0, 0, 255);   // Blue
        drawCircle(circle1.x, circle1.y, circle1.radius);

        // Draw circle2
        p.fill(255, 182, 193); // Pink
        p.stroke(255, 0, 0);   // Red
        drawCircle(circle2.x, circle2.y, circle2.radius);

        // Update circle sizes and positions
        circle1.radius += circle1.growthRate;
        circle2.radius += circle2.growthRate;

        circle1.x += circle1.moveRate;
        circle2.x -= circle2.moveRate;

        // Detect intersection
        let distance = dist(circle1.x, circle1.y, circle2.x, circle2.y);
        if (distance < (circle1.radius + circle2.radius) && !hasPopped) {
            // Create a new popped circle
            let angle = p.random(0, p.TWO_PI);
            let distanceFromCenter = 2.0;
            let newX = (circle1.x + circle2.x) / 2 + distanceFromCenter * p.cos(angle);
            let newY = (circle1.y + circle2.y) / 2 + distanceFromCenter * p.sin(angle);
            poppedCircle = {
                x: newX,
                y: newY,
                radius: 0.5,
                vx: p.random(-0.2, 0.2),
                vy: p.random(-0.2, 0.2)
            };
            hasPopped = true;
        }

        // Move the popped circle
        if (poppedCircle) {
            poppedCircle.x += poppedCircle.vx;
            poppedCircle.y += poppedCircle.vy;

            // Bounce off walls
            if (poppedCircle.x - poppedCircle.radius < -10 || poppedCircle.x + poppedCircle.radius > 10) {
                poppedCircle.vx *= -1;
            }
            if (poppedCircle.y - poppedCircle.radius < -10 || poppedCircle.y + poppedCircle.radius > 10) {
                poppedCircle.vy *= -1;
            }

            // Draw the popped circle
            p.fill(144, 238, 144); // Light green
            p.stroke(0, 128, 0);   // Green
            drawCircle(poppedCircle.x, poppedCircle.y, poppedCircle.radius);
        }
    };

    // Function to map logical coordinates to canvas coordinates
    function drawCircle(logicalX, logicalY, radius) {
        let pixelX = p.map(logicalX, -10, 10, 0, p.width);
        let pixelY = p.map(logicalY, -10, 10, p.height, 0); // Invert y-axis
        let pixelRadius = radius * (p.width / 20); // Since logical units are from -10 to 10
        p.ellipse(pixelX, pixelY, pixelRadius * 2);
    }

    // Function to calculate distance between two points
    function dist(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }
}

// Attach the sketch to the HTML element with id 'sketch3'
new p5(sketch3, 'sketch3');
