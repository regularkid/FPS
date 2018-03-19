var screenWidth = 640;
var screenHeight = 480;
var fps = 60;

aw.init(screenWidth, screenHeight, fps);
aw.initRenderer(screenWidth);
aw.initRaycaster();

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
    if (event.defaultPrevented)
    {
        return;
    }
  
    switch (event.key)
    {
      case "ArrowDown": down = true; break;
      case "ArrowUp": up = true; break;
      case "ArrowLeft": left = true; break;
      case "ArrowRight": right = true; break;
      default: return;
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);

window.addEventListener("keyup", e =>
{
    if (event.defaultPrevented)
    {
        return;
    }
  
    switch (event.key)
    {
      case "ArrowDown": down = false; break;
      case "ArrowUp": up = false; break;
      case "ArrowLeft": left = false; break;
      case "ArrowRight": right = false; break;
      default: return;
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);

aw.state = update;
function update(delta)
{
    // TEMP!
    let turnSpeed = 50.0;
    if (left)
    {
        playerAngle += turnSpeed * delta;
    }
    else if (right)
    {
        playerAngle -= turnSpeed * delta;
    }

    // TEMP!
    let moveSpeed = 1.0 * delta;
    if (up)
    {
        playerX += Math.cos(playerAngle * (Math.PI / 180.0)) * moveSpeed;
        playerY -= Math.sin(playerAngle * (Math.PI / 180.0)) * moveSpeed;
    }
    else if (down)
    {
        playerX -= Math.cos(playerAngle * (Math.PI / 180.0)) * moveSpeed;
        playerY += Math.sin(playerAngle * (Math.PI / 180.0)) * moveSpeed;
    }
    aw.raycast(wallTexture, playerX, playerY, playerAngle);
}