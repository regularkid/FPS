var screenWidth = 640;
var screenHeight = 480;
var fps = 60;

aw.init(screenWidth, screenHeight, fps);
aw.initRenderer(screenWidth);
aw.initRaycaster();

aw.canvas.requestPointerLock = aw.canvas.requestPointerLock || aw.canvas.mozRequestPointerLock;
//aw.canvas.requestPointerLock()
aw.canvas.onclick = function()
{
    aw.canvas.requestPointerLock();
}

var wallTexture = aw.loadTexture("assets/wall.png");
var playerX = 2.5;
var playerY = 2.5;
var playerAngle = 0;

var left = false;
var right = false;
var up = false;
var down = false;
window.addEventListener("keydown", e =>
{
    if (e.defaultPrevented)
    {
        return;
    }
  
    switch (e.key)
    {
        case "a": left = true; break;
        case "d": right = true; break;
        case "w": up = true; break;
        case "s": down = true; break;
        default: return;
    }
  
    e.preventDefault();
}, true);

window.addEventListener("keyup", e =>
{
    if (e.defaultPrevented)
    {
        return;
    }
  
    switch (e.key)
    {
        case "a": left = false; break;
        case "d": right = false; break;
        case "w": up = false; break;
        case "s": down = false; break;
        default: return;
    }
  
    e.preventDefault();
}, true);

var mouseLast;
var mouseDelta = {x: 0, y: 0};
window.addEventListener("mousemove", e =>
{
    // if (mouseLast !== undefined)
    // {
    //     mouseDelta.x += e.clientX - mouseLast.x;
    //     mouseDelta.y += e.clientY - mouseLast.y;
    // }
    mouseDelta.x += e.movementX;
    mouseDelta.y += e.movementY;
    mouseLast = {x: e.clientX, y: e.clientY};
}, true);

aw.state = update;
function update(delta)
{
    // TEMP!
    if (mouseDelta !== undefined)
    {
        let turnSpeed = 5.0;
        playerAngle -= turnSpeed * delta * mouseDelta.x;
        playerAngle = playerAngle % 360.0;
        mouseDelta.x = 0.0;
        mouseDelta.y = 0.0;
    }

    let fwdDir = {x: Math.cos(playerAngle * (Math.PI / 180.0)), y: -Math.sin(playerAngle * (Math.PI / 180.0))};
    let rightDir = {x: -fwdDir.y, y: fwdDir.x};

    // TEMP!
    let moveSpeed = 1.0 * delta;
    if (left)
    {
        playerX -= rightDir.x * moveSpeed;
        playerY -= rightDir.y * moveSpeed;
    }
    else if (right)
    {
        playerX += rightDir.x * moveSpeed;
        playerY += rightDir.y * moveSpeed;
    }

    // TEMP!
    if (up)
    {
        playerX += fwdDir.x * moveSpeed;
        playerY += fwdDir.y * moveSpeed;
    }
    else if (down)
    {
        playerX -= fwdDir.x * moveSpeed;
        playerY -= fwdDir.y * moveSpeed;
    }
    aw.raycast(wallTexture, playerX, playerY, playerAngle);
}