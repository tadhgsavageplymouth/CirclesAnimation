function sketchHashtagsNetwork(p) {
    // Sample data with view counts and hashtag relations
    let hashtagsData = [
        { hashtag: "#coding", viewCountSum: 2000000, videoCount: 15, links: ["#AI", "#webdev"] },
        { hashtag: "#AI", viewCountSum: 3500000, videoCount: 20, links: ["#coding", "#datascience"] },
        { hashtag: "#webdev", viewCountSum: 1500000, videoCount: 10, links: ["#coding"] },
        { hashtag: "#datascience", viewCountSum: 2700000, videoCount: 18, links: ["#AI"] }
    ];

    // Preprocess data to add display properties
    hashtagsData.forEach(tag => {
        tag.avgViewCount = tag.viewCountSum / tag.videoCount;
        tag.size = p.map(tag.avgViewCount, 0, 4000000, 20, 60); // Scale node size
        tag.color = [p.random(100, 255), p.random(100, 200), p.random(200, 255)]; // Random colors for variety
        tag.x = p.random(100, p.width - 100);
        tag.y = p.random(100, p.height - 100);
    });

    p.setup = function() {
        p.createCanvas(600, 600);
        p.frameRate(30);
        p.textAlign(p.CENTER, p.CENTER);
    };

    p.draw = function() {
        p.background(255);

        // Draw edges based on links between hashtags
        p.stroke(180);
        p.strokeWeight(1);
        hashtagsData.forEach(tag => {
            tag.links.forEach(linkHashtag => {
                let linkedTag = hashtagsData.find(t => t.hashtag === linkHashtag);
                if (linkedTag) {
                    p.line(tag.x, tag.y, linkedTag.x, linkedTag.y);
                }
            });
        });

        // Draw nodes for each hashtag
        hashtagsData.forEach(tag => {
            // Set fill based on the node's color property
            p.fill(...tag.color, 200);
            p.stroke(0);
            p.strokeWeight(1);
            p.ellipse(tag.x, tag.y, tag.size);

            // Display hashtag text and view count
            p.fill(0);
            p.noStroke();
            p.textSize(12);
            p.text(tag.hashtag, tag.x, tag.y - tag.size / 2 - 10);
            p.textSize(10);
            p.text(`Views: ${Math.round(tag.avgViewCount)}`, tag.x, tag.y + tag.size / 2 + 10);

            // Interactive hover effect to highlight node
            if (p.dist(p.mouseX, p.mouseY, tag.x, tag.y) < tag.size / 2) {
                p.stroke(0);
                p.strokeWeight(2);
                p.noFill();
                p.ellipse(tag.x, tag.y, tag.size + 10);

                // Display detailed tooltip
                p.fill(50);
                p.textSize(14);
                p.text(`Hashtag: ${tag.hashtag}\nTotal Views: ${tag.viewCountSum}\nVideos: ${tag.videoCount}`, p.mouseX, p.mouseY - 20);
            }
        });
    };
}

// Attach the sketch to the HTML element with id 'sketchHashtagsNetwork'
new p5(sketchHashtagsNetwork, 'sketchHashtagsNetwork');
