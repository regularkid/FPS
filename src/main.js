var screenWidth = 640;
var screenHeight = 480;
var fps = 60;

aw.init(screenWidth, screenHeight, fps);
aw.initRenderer(screenWidth);
aw.initRaycaster();

var wallTexture = aw.loadTexture("assets/wall.png");
var playerAngle = 0;

window.addEventListener("keydown", e =>
{
    if (event.defaultPrevented)
    {
        return; // Do nothing if the event was already processed
    }
  
    switch (event.key)
    {
      case "ArrowDown":
        // code for "down arrow" key press.
        break;
      case "ArrowUp":
        // code for "up arrow" key press.
        break;
      case "ArrowLeft":
        playerAngle++;
        break;
      case "ArrowRight":
        playerAngle--;
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);

aw.state = update;
function update(delta)
{
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