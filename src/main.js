aw.init(640, 480, 60, update);

var x = 0; 
var vx = 200.0;
var size = 50;
function update(delta)
{
    x += vx * delta;
    if (x < 0.0)
    {
        x = 0.0;
        vx = -vx;
    }
    else if (x >= 640 - size)
    {
        x = 640 - size;
        vx = -vx;
    }

    aw.ctx.fillStyle = "red";
    aw.ctx.fillRect(x, 10, size, size);
}