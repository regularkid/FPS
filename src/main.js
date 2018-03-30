var screenWidth = 320;
var screenHeight = 240;
var screenScale = 2.0;

var aw = new Aw(screenWidth, screenHeight, screenScale);
var raycast = new Raycast();
var render = new Render(screenWidth);

aw.enableMouseLock();

var wallTexture = render.loadTexture("assets/wall.png");
var playerX = 2.5;
var playerY = 2.5;
var playerAngle = 0;

var map = new Map();
map.addWall(new Vec(150, 50), new Vec(150, -50));

aw.state = update;

function update(delta)
{
    // TEMP!
    let turnSpeed = 5.0;
    playerAngle -= turnSpeed * delta * aw.mouseDelta.x;
    playerAngle = playerAngle % 360.0;

    let fwdDir = {x: Math.cos(playerAngle * (Math.PI / 180.0)), y: -Math.sin(playerAngle * (Math.PI / 180.0))};
    let rightDir = {x: -fwdDir.y, y: fwdDir.x};

    // TEMP!
    let moveSpeed = 1.0 * delta;
    if (aw.keys.a)
    {
        playerX -= rightDir.x * moveSpeed;
        playerY -= rightDir.y * moveSpeed;
    }
    else if (aw.keys.d)
    {
        playerX += rightDir.x * moveSpeed;
        playerY += rightDir.y * moveSpeed;
    }

    // TEMP!
    if (aw.keys.w)
    {
        playerX += fwdDir.x * moveSpeed;
        playerY += fwdDir.y * moveSpeed;
    }
    else if (aw.keys.s)
    {
        playerX -= fwdDir.x * moveSpeed;
        playerY -= fwdDir.y * moveSpeed;
    }

    raycast.raycast(wallTexture, playerX, playerY, playerAngle);
}