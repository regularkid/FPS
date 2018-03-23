class Map
{
    constructor()
    {
        this.walls = [];
    }

    addWall(v1, v2)
    {
        this.walls.push({points: [v1, v2]});
    }
}