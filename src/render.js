class Render
{
    constructor(numColumns)
    {
        this.numColumns = numColumns;
        this.columnSize = aw.width / numColumns;
    }

    loadTexture(src)
    {
        let texture = new Image();
        texture.src = src;

        return texture;
    }

    drawColumn(columnIdx, top, height, texture, textureCol)
    {
        let srcWidth = 1.0;
        let srcHeight = texture.height;
        let srcX = Math.floor(textureCol % texture.width);
        let srcY = 0.0;

        let dstWidth = this.columnSize;
        let dstHeight = height;
        let dstX = columnIdx * this.columnSize;
        let dstY = top;

        aw.ctx.drawImage(texture, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight);
    }

    drawLine(x1, y1, x2, y2, size, color)
    {
        aw.ctx.lineWidth = size;
        aw.ctx.strokeStyle = color;

        aw.ctx.beginPath();
        aw.ctx.moveTo(x1, y1);
        aw.ctx.lineTo(x2, y2);
        aw.ctx.stroke();
    }

    drawCircle(x, y, radius, size, color)
    {
        aw.ctx.lineWidth = size;
        aw.ctx.strokeStyle = color;

        aw.ctx.beginPath();
        aw.ctx.arc(x, y, radius, 0, Math.PI*2.0);
        aw.ctx.stroke();
    }

    drawMap2D(map, x, y, angle)
    {
        // Everything should be relative to the center of the screen with angle 0 facing straight up
        aw.ctx.translate(aw.width * 0.5, aw.height * 0.5);
        aw.ctx.rotate(-Math.PI * 0.5);

        // Player
        aw.drawCircle(0.0, 0.0, 4.0, 2.0, "#00FF00");
        aw.drawLine(4.0, 0.0, 15.0, 0.0, 2.0, "#00FF00");

        // Precache values we use for each wall below
        let playerPos = new Vec(x, y);
        let cosAngle = Math.cos(angle);
        let sinAngle = Math.sin(angle);

        // Walls
        aw.ctx.strokeStyle = '#FF0000';
        map.walls.forEach(wall =>
        {
            let v1 = Vec.createFromTo(playerPos, wall.points[0]);
            let v2 = Vec.createFromTo(playerPos, wall.points[1]);

            let x1 = v1.x*cosAngle - v1.y*sinAngle;
            let y1 = v1.x*sinAngle + v1.y*cosAngle;
            let x2 = v2.x*cosAngle - v2.y*sinAngle;
            let y2 = v2.x*sinAngle + v2.y*cosAngle;

            aw.drawLine(x1, y1, x2, y2, 2.0, "#FF0000");
        });

        // Reset
        aw.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}