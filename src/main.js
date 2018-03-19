var screenWidth = 640;
var screenHeight = 480;
var fps = 60;

aw.init(screenWidth, screenHeight, fps);
aw.initRenderer(screenWidth);
aw.initRaycaster();

var wallTexture = aw.loadTexture("assets/wall.png");
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
    let turnSpeed = 50.0;
    if (left)
    {
        playerAngle += turnSpeed * delta;
    }
    else if (right)
    {
        playerAngle -= turnSpeed * delta;
    }
    aw.raycast(wallTexture, playerAngle);
    // let wallWidth = 256.0;
    // for (let i = 0; i < 640; i++)
    // {
    //     // TEMP
    //     let u1 = (i / wallWidth) % 1.0;
    //     let v1 = 0.0;
    //     let u2 = u1 + (1.0 / wallWidth);
    //     let v2 = 1.0;
    //     aw.drawColumn(i, 90, 300, wallTexture, u1, v1, u2, v2);
    // }
}