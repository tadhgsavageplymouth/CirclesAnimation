function sketchHashtags(p) {
    // Sample data relating hashtags to view counts
    let hashtagsData = [
        { hashtag: "#coding", viewCountSum: 2000000, videoCount: 15 },
        { hashtag: "#AI", viewCountSum: 3500000, videoCount: 20 },
        { hashtag: "#webdev", viewCountSum: 1500000, videoCount: 10 },
        { hashtag: "#datascience", viewCountSum: 2700000, videoCount: 18 }
    ];

    // Preprocess data to calculate average views per video using each hashtag
    hashtagsData.forEach(tag => {
        tag.avgViewCount = tag.viewCountSum / tag.videoCount;
    });

    p.setup = function() {
        p.createCanvas(600, 600);
        p.frameRate(30);
        p.textAlign(p.CENTER, p.CENTER);
    };

    p.draw = function() {
        p.background(255);

        // Set the center of the circular layout
        let centerX = p.width / 2;
        let centerY = p.height / 2;
        let radius = 200; // Radius of the circular layout

        // Draw each hashtag as a bubble in a circular layout
        hashtagsData.forEach((tag, index) => {
            // Map view count to bubble size and color intensity
            let bubbleSize = p.map(tag.avgViewCount, 0, 4000000, 20, 100);
            let colorIntensity = p.map(tag.avgViewCount, 0, 4000000, 150, 255);

            // Calculate the position for each bubble in a circular arrangement
            let angle = p.TWO_PI / hashtagsData.length * index;
            let xPos = centerX + radius * p.cos(angle);
            let yPos = centerY + radius * p.sin(angle);

            // Pulsating effect based on view count
            let pulse = p.sin(p.frameCount * 0.1 + index) * 3;
            let displaySize = bubbleSize + pulse;

            // Set color based on avgViewCount and apply transparency
            p.fill(255, colorIntensity, 150, 200);
            p.stroke(0);
            p.ellipse(xPos, yPos, displaySize);

            // Display hashtag and avg view count
            p.fill(0);
            p.noStroke();
            p.textSize(12);
            p.text(`${tag.hashtag}\nAvg Views: ${Math.round(tag.avgViewCount)}`, xPos, yPos + displaySize / 2 + 10);

            // Check if the mouse is over the bubble
            if (p.dist(p.mouseX, p.mouseY, xPos, yPos) < displaySize / 2) {
                // Highlight bubble on hover
                p.stroke(0);
                p.strokeWeight(2);
                p.noFill();
                p.ellipse(xPos, yPos, displaySize + 10);

                // Display tooltip with detailed information
                p.fill(50);
                p.textSize(14);
                p.text(
                    `Hashtag: ${tag.hashtag}\nViews: ${tag.viewCountSum}\nVideos: ${tag.videoCount}`,
                    p.mouseX,
                    p.mouseY - 20
                );
            }
        });
    };
}

// Attach the sketch to the HTML element with id 'sketchHashtags'
new p5(sketchHashtags, 'sketchHashtags');
