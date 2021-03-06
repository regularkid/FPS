class Aw
{
    //////////////////////////
    //-------- CORE --------//
    //////////////////////////

    constructor(width, height, scale)
    {
        this.initDisplay(width, height, scale);
        this.initInput();

        this.gameLoop(performance.now());
    }

    initDisplay(width, height, scale)
    {
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("width", width);
        this.canvas.setAttribute("height", height);
        this.canvas.style.width = `${width * scale}px`;
        this.canvas.style.height = `${height * scale}px`;
        this.canvas.style.backgroundColor = "black";
        document.getElementById("game").appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.scale = scale;
    }

    gameLoop(curTime)
    {
        window.requestAnimationFrame(this.gameLoop.bind(this));
        
        let deltaTime = Math.min((curTime - (this.lastTime || curTime)) / 1000.0, 0.2);  // Cap to 200ms (5fps)
        this.lastTime = curTime;

        if (this.state)
        {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.state(deltaTime);
        }

        this.clearMouseDelta();
    }

    ///////////////////////////
    //-------- INPUT --------//
    ///////////////////////////

    initInput()
    {
        this.mousePos = {x: 0, y: 0};
        this.mouseDelta = {x: 0, y: 0};
        this.mouseLeft = false;
        this.mouseRight = false;

        window.addEventListener("mousemove", e =>
        {
            this.mouseDelta.x += e.movementX;
            this.mouseDelta.y += e.movementY;
            this.mousePos = {x: e.clientX, y: e.clientY};
        });

        window.addEventListener("mousedown", e =>
        {
            if (e.button === 0) { this.mouseLeft = true; }
            else if (e.button === 2) { this.mouseRight = true; }            
        });

        window.addEventListener("mouseup", e =>
        {
            if (e.button === 0) { this.mouseLeft = false; }
            else if (e.button === 2) { this.mouseRight = false; }            
        });

        this.keyToName =
        {
            "w": "w",  "a": "a",  "s": "s", "d": "d",
            "arrowup": "up", "arrowdown": "down", "arrowleft": "left", "arrowright": "right",
            "z": "z", "x": "x", " ": "space", "shift": "shift",
        };

        this.keys = {};
        Object.keys(this.keyToName).forEach(key => this.keys[key] = false);

        window.addEventListener("keydown", e =>
        {
            this.setKeyState(e, true);
        });

        window.addEventListener("keyup", e =>
        {
            this.setKeyState(e, false);
        });
    }

    setKeyState(event, isOn)
    {
        let keyCode = event.key.toLowerCase();
        if (this.keyToName[keyCode] !== undefined)
        {
            this.keys[this.keyToName[keyCode]] = isOn;
            event.preventDefault();
        }
    }

    clearMouseDelta()
    {
        this.mouseDelta.x = 0.0;
        this.mouseDelta.y = 0.0;
    }

    enableMouseLock()
    {
        this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;
        this.canvas.onclick = () =>
        {
            this.canvas.requestPointerLock();
        }
    }
}