class Raycast
{
    constructor()
    {
        this.grid = [];

        for (let row = 0; row < 5; row++)
        {
            this.grid[row] = [];
            for (let col = 0; col < 5; col++)
            {
                this.grid[row][col] = (col === 0 || col === 4 || row === 0 || row === 4) ? 1 : 0;
            }
        }
    }

    raycast(wallTexture, xMap, yMap, angle)
    {
        let drawTime = 0;

        // TEMP
        let fov = 55;

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

            // Vertical grid lines
            let slope = sinAngle / cosAngle;
            let xStep = cosAngle >= 0.0 ? 1 : -1;
            let yStep = xStep * slope;            
            let xCur = cosAngle >= 0.0 ? Math.ceil(xMap) : Math.floor(xMap);
	        let yCur = yMap + (xCur - xMap) * slope;

            let timeout = 20;
            while (isFinite(slope) && !isNaN(slope) && xCur >= 0 && xCur < 5 && yCur >= 0 && yCur < 5 && timeout > 0)
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
            while (isFinite(slope) && !isNaN(slope) && xCur >= 0 && xCur < 5 && yCur >= 0 && yCur < 5 && timeout > 0)
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
                let height = (80 / (distHit * fishEyeCorrection));
                let top = (aw.height - height) * 0.5;
                render.drawColumn(i, top, height, wallTexture, u1 * 128 * 2.0);
            }
        }
    }
}