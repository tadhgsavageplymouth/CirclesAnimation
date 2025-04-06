// Script5

function sketchHashtagsNetwork(p) {
    let hashtagsData = [];

    p.preload = function() {
        hashtagsData = p.loadJSON("hashtags.json");
    };

    p.setup = function() {
        p.createCanvas(800, 600);
        p.frameRate(30);
        p.textAlign(p.CENTER, p.CENTER);

        // Preprocess data
        hashtagsData.forEach(tag => {
            tag.avgViewCount = tag.viewCountSum / tag.videoCount;
            tag.size = p.map(tag.avgViewCount, 0, 5000000, 20, 60);
            tag.color = [p.random(100, 255), p.random(100, 200), p.random(200, 255)];
            tag.x = p.random(100, p.width - 100);
            tag.y = p.random(100, p.height - 100);
        });
    };

    p.draw = function() {
        p.background(250);

        // Draw edges
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

        // Draw nodes
        hashtagsData.forEach(tag => {
            p.fill(...tag.color, 200);
            p.stroke(0);
            p.ellipse(tag.x, tag.y, tag.size);

            p.fill(0);
            p.noStroke();
            p.textSize(12);
            p.text(tag.hashtag, tag.x, tag.y - tag.size / 2 - 10);
            p.textSize(10);
            p.text(`Views: ${Math.round(tag.avgViewCount)}`, tag.x, tag.y + tag.size / 2 + 10);

            // Hover effect
            if (p.dist(p.mouseX, p.mouseY, tag.x, tag.y) < tag.size / 2) {
                p.stroke(0);
                p.strokeWeight(2);
                p.noFill();
                p.ellipse(tag.x, tag.y, tag.size + 10);
                p.fill(50);
                p.textSize(14);
                p.text(`Hashtag: ${tag.hashtag}\nViews: ${tag.viewCountSum}\nVideos: ${tag.videoCount}`, p.mouseX, p.mouseY - 20);
            }
        });
    };
}

// Attach to DOM
new p5(sketchHashtagsNetwork, 'sketchHashtagsNetwork');
