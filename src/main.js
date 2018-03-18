var screenWidth = 640;
var screenHeight = 480;
var fps = 60;

aw.init(screenWidth, screenHeight, fps);
aw.initRenderer(screenWidth);

var wallTexture = aw.loadTexture("assets/wall.png");

aw.state = update;
function update(delta)
{
    let wallWidth = 256.0;
    for (let i = 0; i < 640; i++)
    {
        // TEMP
        let u1 = (i / wallWidth) % 1.0;
        let v1 = 0.0;
        let u2 = u1 + (1.0 / wallWidth);
        let v2 = 1.0;
        aw.drawColumn(i, 90, 300, wallTexture, u1, v1, u2, v2);
    }
}