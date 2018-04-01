class Raycast
{
    constructor()
    {
        // this.grid = [];

        // for (let row = 0; row < 5; row++)
        // {
        //     this.grid[row] = [];
        //     for (let col = 0; col < 5; col++)
        //     {
        //         let isOuterWall = col === 0 || col === 4 || row === 0 || row === 4;
        //         if (isOuterWall)
        //         {
        //             this.grid[row][col] = (col !== 0 && row !== 0) ? 1 : 2;
        //         }
        //         else
        //         {
        //             this.grid[row][col] = 0;
        //         }
        //     }
        // }

        this.colorLookup =
        [
            {light: "#000000", dark: "#000000"},
            {light: "#FF0000", dark: "#880000"},
            {light: "#00FF00", dark: "#008800"},
            {light: "#0000FF", dark: "#000088"},
        ];

        this.generateMap();
    }

    generateMap()
    {
        this.grid = [];
        this.width = 11;
        this.height = 11;
 
        let moves = [];
        for(var i = 0; i < this.width; i ++)
        {
            this.grid[i] = [];
            for(var j = 0; j < this.height; j ++)
            {
                this.grid[i][j] = 1;
            }
        }

        let posX = 1;
        let posY = 1;
        this.grid[posX][posY] = 0; 
        moves.push(posY + posY * this.width);
        while (moves.length > 0)
        {
            var possibleDirections = "";
            if(posX+2 > 0 && posX + 2 < this.height - 1 && this.grid[posX + 2][posY] == 1){
                    possibleDirections += "S";
            }
            if(posX-2 > 0 && posX - 2 < this.height - 1 && this.grid[posX - 2][posY] == 1){
                    possibleDirections += "N";
            }
            if(posY-2 > 0 && posY - 2 < this.width - 1 && this.grid[posX][posY - 2] == 1){
                    possibleDirections += "W";
            }
            if(posY+2 > 0 && posY + 2 < this.width - 1 && this.grid[posX][posY + 2] == 1){
                    possibleDirections += "E";
            } 
            if(possibleDirections)
            {
                    var move = Math.floor(Math.random() * possibleDirections.length);
                    switch (possibleDirections[move]){
                        case "N": 
                            this.grid[posX - 2][posY] = 0;
                            this.grid[posX - 1][posY] = 0;
                            posX -= 2;
                            break;
                        case "S":
                            this.grid[posX + 2][posY] = 0;
                            this.grid[posX + 1][posY] = 0;
                            posX += 2;
                            break;
                        case "W":
                            this.grid[posX][posY - 2] = 0;
                            this.grid[posX][posY - 1] = 0;
                            posY -= 2;
                            break;
                        case "E":
                            this.grid[posX][posY + 2]=0;
                            this.grid[posX][posY + 1]=0;
                            posY += 2;
                            break;         
                    }
                    moves.push(posY + posX * this.width);     
            }
            else
            {
                    var back = moves.pop();
                    posX = Math.floor(back / this.width);
                    posY = back % this.width;
            }                                      
        }      
    }

    raycast(wallTexture, xMap, yMap, angle)
    {
        let drawTime = 0;

        // TEMP
        let fov = 60;

        let startAngle = angle + (fov * 0.5);
        let angleStep = fov / render.numColumns;

        for (let i = 0; i < render.numColumns; i++)
        {
            let curAngleDeg = startAngle - (angleStep * i);
            let curAngleRad = curAngleDeg * (Math.PI / 180);
            let cosAngle = Math.cos(curAngleRad);
            let sinAngle = -Math.sin(curAngleRad);
            let distHit = -1;
            let xHit = -1;
            let yHit = -1;
            let u1 = 0.0;
            let isVertical = false;
            let wallId = 0;

            // Vertical grid lines
            let slope = sinAngle / cosAngle;
            let xStep = cosAngle >= 0.0 ? 1 : -1;
            let yStep = xStep * slope;            
            let xCur = cosAngle >= 0.0 ? Math.ceil(xMap) : Math.floor(xMap);
	        let yCur = yMap + (xCur - xMap) * slope;

            let timeout = 20;
            while (isFinite(slope) && !isNaN(slope) && xCur >= 0 && xCur < this.width && yCur >= 0 && yCur < this.height && timeout > 0)
            {
                let xWall = Math.floor(xCur + (cosAngle >= 0.0 ? 0 : -1));
                let yWall = Math.floor(yCur);
        
                if (this.grid[yWall] !== undefined && this.grid[yWall][xWall] !== undefined && this.grid[yWall][xWall] > 0)
                {
                    let xDist = xCur - xMap;
                    let yDist = yCur - yMap;
                    
                    distHit = Math.sqrt(xDist*xDist + yDist*yDist);
                    xHit = xCur;
                    yHit = yCur;
                    u1 = yHit % 1.0;
                    isVertical = true;
                    wallId = this.grid[yWall][xWall];
                    break;
                }

                xCur += xStep;
                yCur += yStep;

                timeout--;
            }

            // Horizontal grid lines
            slope = cosAngle / sinAngle;
            yStep = sinAngle >= 0.0 ? 1 : -1;
            xStep = yStep * slope;
            yCur = sinAngle >= 0.0 ? Math.ceil(yMap) : Math.floor(yMap);
	        xCur = xMap + (yCur - yMap) * slope;

            timeout = 20;
            while (isFinite(slope) && !isNaN(slope) && xCur >= 0 && xCur < this.width && yCur >= 0 && yCur < this.height && timeout > 0)
            {
                let yWall = Math.floor(yCur + (sinAngle >= 0.0 ? 0 : -1));
                let xWall = Math.floor(xCur);

                if (this.grid[yWall] !== undefined && this.grid[yWall][xWall] !== undefined && this.grid[yWall][xWall] > 0)
                {
                    let xDist = xCur - xMap;
                    let yDist = yCur - yMap;
                    let dist = Math.sqrt(xDist*xDist + yDist*yDist);
                    if (distHit < 0.0 || dist < distHit)
                    {
                        distHit = dist;
                        xHit = xCur;
                        yHit = yCur;
                        u1 = xHit % 1.0;
                        isVertical = false;
                        wallId = this.grid[yWall][xWall];
                        break;
                    }
                }

                xCur += xStep;
                yCur += yStep;

                timeout--;
            }

            if (distHit >= 0.0)
            {
                let v1 = 0.0;
                let u2 = u1 + (1.0 / render.numColumns);
                let v2 = 1.0;
                let fishEyeCorrection = Math.cos((angle - curAngleDeg) * (Math.PI / 180));
                distHit *= fishEyeCorrection;
                let height = (1.0 / distHit) * 200.0;
                let top = (aw.height - height) * 0.5;

                let color = isVertical ? this.colorLookup[wallId].light : this.colorLookup[wallId].dark;
                let segmentDividerFraction = 0.01;
                if (u1 <= segmentDividerFraction || u1 >= 1.0 - segmentDividerFraction)
                {
                    color = "#000000";
                }
                render.drawColumn(i, top, height, color);
            }
        }
    }

    drawMap(playerX, playerY)
    {
        let gridSize = 5;
        let borderSize = 2;

        aw.ctx.fillStyle = "#000000";
        aw.ctx.fillRect(0, 0, (this.width * gridSize) + (borderSize * 2.0), (this.height * gridSize) + (borderSize * 2.0));

        for(var i = 0; i < this.width; i ++)
        {
            for(var j = 0; j < this.height; j ++)
            {
                let color = this.colorLookup[this.grid[i][j]].light;
                if (Math.floor(playerX) == j && Math.floor(playerY) == i)
                {
                    color = "#00FF00";
                }

                aw.ctx.fillStyle = color;
                aw.ctx.fillRect(borderSize + (i * gridSize), borderSize + ((this.height - j - 1) * gridSize), gridSize, gridSize);
            }
        }
    }
}