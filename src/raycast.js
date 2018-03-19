var aw = (function(public)
{
    let m_grid;

    public.initRaycaster = () =>
    {
        m_grid = [];
        for (let row = 0; row < 5; row++)
        {
            m_grid[row] = [];
            for (let col = 0; col < 5; col++)
            {
                m_grid[row][col] = (col === 0 || col === 4 || row === 0 || row === 4) ? 1 : 0;
            }
        }
    }

    public.raycast = (wallTexture, angle) =>
    {
        // TEMP
        let xMap = 2.5;
        let yMap = 2.5;
        let fov = 60;

        let startAngle = angle + (fov * 0.5);
        let angleStep = fov / public.numColumns;

        for (let i = 0; i < public.numColumns; i++)
        {
            let curAngleDeg = startAngle - (angleStep * i);
            let curAngleRad = curAngleDeg * (Math.PI / 180);
            let cosAngle = Math.cos(curAngleRad);
            let sinAngle = -Math.sin(curAngleRad);
            let distHit = -1;
            let xHit = -1;
            let yHit = -1;

            // Vertical grid lines
            let slope = sinAngle / cosAngle;
            let xStep = cosAngle >= 0.0 ? 1 : -1;
            let yStep = xStep * slope;            
            var xCur = cosAngle >= 0.0 ? Math.ceil(xMap) : Math.floor(xMap);
	        var yCur = yMap + (xCur - xMap) * slope;

            let timeout = 20;
            while (xCur >= 0 && xCur < 5 && yCur >= 0 && yCur < 5 && timeout > 0)
            {
                var xWall = Math.floor(xCur + (cosAngle >= 0.0 ? 0 : -1));
                var yWall = Math.floor(yCur);
        
                // Is this point inside a wall block?
                if (m_grid[yWall][xWall] > 0)
                {
                    var xDist = xCur - xMap;
                    var yDist = yCur - yMap;
                    
                    distHit = Math.sqrt(xDist*xDist + yDist*yDist);
                    xHit = xCur;
                    yHit = yCur;
                    break;
                }

                xCur += xStep;
                yCur += yStep;

                timeout--;
            }

            if (distHit >= 0.0)
            {
                let u1 = yHit % 1.0;
                let v1 = 0.0;
                let u2 = u1 + (1.0 / public.numColumns);
                let v2 = 1.0;
                let height = (300 / (distHit));// * cosAngle));
                let top = (public.height - height) * 0.5;
                aw.drawColumn(i, top, height, wallTexture, u1, v1, u2, v2);
                //console.log(`${i} - ${curAngleDeg} dist: ${distHit} - ${distHit * cosAngle}`);
            }

                // let xDist = Math.abs(xEdge - xMap);
                // let yDist = Math.abs(yEdge - yMap);
                // if (xDist < yDist)
                // {
                //     if (m_grid[yCur][xCur] === 1)
                //     {
                //         let u1 = (xDist * yStep) % 1.0;
                //         let v1 = 0.0;
                //         let u2 = u1 + (1.0 / public.numColumns);
                //         let v2 = 1.0;
                //         aw.drawColumn(i, 90, 300, wallTexture, u1, v1, u2, v2);
                //         break;
                //     }
                //     else
                //     {
                //         xEdge += xStep;
                //         xCur += xStep >= 0.0 ? 1 : -1;
                //     }
                // }
                // else
                // {
                //     if (m_grid[yCur][xCur] === 1)
                //     {
                //         let u1 = (yDist * xStep) % 1.0;
                //         let v1 = 0.0;
                //         let u2 = u1 + (1.0 / public.numColumns);
                //         let v2 = 1.0;
                //         //aw.drawColumn(i, 90, 300, wallTexture, u1, v1, u2, v2);
                //         break;
                //     }
                //     else
                //     {
                //         yEdge += yStep;
                //         yCur += yStep >= 0.0 ? 1 : -1;
                //     }
                // }
        }
    }
     
    return public;
}(aw || {}));