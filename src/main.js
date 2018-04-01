var screenWidth = 320;
var screenHeight = 240;
var screenScale = 2.0;

var aw = new Aw(screenWidth, screenHeight, screenScale);
var raycast = new Raycast();
var render = new Render(screenWidth);

aw.enableMouseLock();

var wallTexture = render.loadTexture("assets/wall.png");
var playerX = 1.5;
var playerY = 1.5;
var playerAngle = 0;

var map = new Map();
map.addWall(new Vec(150, 50), new Vec(150, -50));

aw.state = update;

var curVelocity = {x: 0.0, y: 0.0};
var velocityLerpFactor = 0.2;
function update(delta)
{
    aw.ctx.fillStyle = "#444444";
    aw.ctx.fillRect(0, 0, aw.width, aw.height * 0.5);
    aw.ctx.fillStyle = "#AAAAAA";
    aw.ctx.fillRect(0, aw.height * 0.5, aw.width, aw.height * 0.5);

    // TEMP!
    let turnSpeed = 5.0;
    playerAngle -= turnSpeed * delta * aw.mouseDelta.x;
    playerAngle = playerAngle % 360.0;

    let fwdDir = {x: Math.cos(playerAngle * (Math.PI / 180.0)), y: -Math.sin(playerAngle * (Math.PI / 180.0))};
    let rightDir = {x: -fwdDir.y, y: fwdDir.x};

    // TEMP!
    let moveSpeed = aw.keys.shift ? 2.5 : 1.5;
    let desiredVelocity = {x: 0.0, y: 0.0};
    if (aw.keys.a)
    {
        desiredVelocity.x -= rightDir.x * moveSpeed;
        desiredVelocity.y -= rightDir.y * moveSpeed;
    }
    else if (aw.keys.d)
    {
        desiredVelocity.x += rightDir.x * moveSpeed;
        desiredVelocity.y += rightDir.y * moveSpeed;
    }

    // TEMP!
    if (aw.keys.w)
    {
        desiredVelocity.x += fwdDir.x * moveSpeed;
        desiredVelocity.y += fwdDir.y * moveSpeed;
    }
    else if (aw.keys.s)
    {
        desiredVelocity.x -= fwdDir.x * moveSpeed;
        desiredVelocity.y -= fwdDir.y * moveSpeed;
    }

    curVelocity.x += (desiredVelocity.x - curVelocity.x) * velocityLerpFactor;
    curVelocity.y += (desiredVelocity.y - curVelocity.y) * velocityLerpFactor;
    playerX += curVelocity.x * delta;
    playerY += curVelocity.y * delta;

    raycast.raycast(wallTexture, playerX, playerY, playerAngle);
    raycast.drawMap(playerX, playerY);
}