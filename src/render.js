var aw = (function(public)
{
    let m_numColumns;
    let m_columnSize;

    public.initRenderer = function(numColumns)
    {
        m_numColumns = numColumns;
        m_columnSize = public.width / numColumns;
    }

    public.loadTexture = function(src)
    {
        let texture = new Image();
        texture.src = src;

        return texture;
    }

    public.drawColumn = function(columnIdx, top, height, texture, u1, v1, u2, v2)
    {
        let srcWidth = texture.width * (u2 - u1);
        let srcHeight = texture.height * (v2 - v1);
        let srcX = texture.width * u1;
        let srcY = texture.height * v1;

        let dstWidth = m_columnSize;
        let dstHeight = height;
        let dstX = columnIdx * m_columnSize;
        let dstY = top;
        public.ctx.drawImage(texture, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight);
    }
    
    return public;
}(aw || {}));