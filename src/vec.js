class Vec
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    static createCopy(v)
    {
        return new Vec(v.x, v.y);
    }

    static createFromTo(v1, v2)
    {
        return new Vec(v2.x - v1.x, v2.y - v1.y);
    }

    length()
    {
        return Math.sqrt((this.x*this.x) + (this.y*this.y));
    }

    lengthSq()
    {
        return (this.x*this.x) + (this.y*this.y);
    }

    normalize()
    {
        let mag = this.length();
        this.x /= mag;
        this.y /= mag;

        return mag;
    }

    distanceTo(otherVec)
    {
        let v = this.createFromTo(this. otherVec);
        return v.length();
    }

    distanceSqTo(otherVec)
    {
        let v = this.createFromTo(this. otherVec);
        return v.lengthSq();
    }

    toString()
    {
        return `(${this.x}, ${this.y})`;
    }
}