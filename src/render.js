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
    
    return public;
}(aw || {}));