var aw = (function(public)
{
    let m_lastTime = 0;
  
    public.init = (width, height, fps, state) =>
    {
        let canvas = document.createElement("canvas");
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        canvas.style.backgroundColor = "black";
        document.getElementById("game").appendChild(canvas);

        public.ctx = canvas.getContext('2d');
        public.width = width;
        public.height = height;
        public.state = state;

        gameLoop();
    }

    gameLoop = () =>
    {
        let curTime = Date.now();
        let deltaTime = (curTime - m_lastTime) / 1000.0;
        m_lastTime = curTime;

        public.ctx.clearRect(0, 0, public.width, public.height);
        if (public.state)
        {
            public.state(deltaTime);
        }

        window.requestAnimationFrame(gameLoop);
    }
     
    return public;
}(aw || {}));