var aw = (function(public)
{
    public.initRenderer = function(numColumns)
    {
        public.numColumns = numColumns;
        public.columnSize = public.width / numColumns;
    }

    public.loadTexture = function(src)
    {
        let texture = new Image();
        texture.src = src;

        return texture;
    }

    public.drawColumn = function(columnIdx, top, height, texture, textureCol)
    {
        let srcWidth = 1.0;
        let srcHeight = texture.height;
        let srcX = Math.floor(textureCol % texture.width);
        let srcY = 0.0;

        let dstWidth = 1.0;
        let dstHeight = height;
        let dstX = columnIdx;
        let dstY = top;

        public.ctx.drawImage(texture, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight);
    }

    public.drawLine = function(x1, y1, x2, y2, size, color)
    {
        public.ctx.lineWidth = size;
        public.ctx.strokeStyle = color;

        public.ctx.beginPath();
        public.ctx.moveTo(x1, y1);
        public.ctx.lineTo(x2, y2);
        public.ctx.stroke();
    }

    public.drawCircle = function(x, y, radius, size, color)
    {
        public.ctx.lineWidth = size;
        public.ctx.strokeStyle = color;

        public.ctx.beginPath();
        public.ctx.arc(x, y, radius, 0, Math.PI*2.0);
        public.ctx.stroke();
    }

    public.drawMap2D = function(map, x, y, angle)
    {
        // Everything should be relative to the center of the screen with angle 0 facing straight up
        public.ctx.translate(public.width * 0.5, public.height * 0.5);
        public.ctx.rotate(-Math.PI * 0.5);

        // Player
        public.drawCircle(0.0, 0.0, 4.0, 2.0, "#00FF00");
        public.drawLine(4.0, 0.0, 15.0, 0.0, 2.0, "#00FF00");

        // Precache values we use for each wall below
        let playerPos = new Vec(x, y);
        let cosAngle = Math.cos(angle);
        let sinAngle = Math.sin(angle);

        // Walls
        public.ctx.strokeStyle = '#FF0000';
        map.walls.forEach(wall =>
        {
            let v1 = Vec.createFromTo(playerPos, wall.points[0]);
            let v2 = Vec.createFromTo(playerPos, wall.points[1]);

            let x1 = v1.x*cosAngle - v1.y*sinAngle;
            let y1 = v1.x*sinAngle + v1.y*cosAngle;
            let x2 = v2.x*cosAngle - v2.y*sinAngle;
            let y2 = v2.x*sinAngle + v2.y*cosAngle;

            public.drawLine(x1, y1, x2, y2, 2.0, "#FF0000");
        });

        // Reset
        public.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    
    return public;
}(aw || {}));