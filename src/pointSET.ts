import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";

class PointSET {
  private points: Point2D[];

  public constructor() {
    this.points = [];
  }

  public isEmpty(): boolean {
    return this.points.length === 0;
  }

  public size(): number {
    return this.points.length;
  }

  public insert(p: Point2D): void {
    if (!this.contains(p)) {
      this.points.push(p);
    }
  }

  public contains(p: Point2D): boolean {
    return this.points.some((point) => point.equals(p));
  }

  public draw(p: any): void {
    this.points.forEach((point) => point.draw(p));
  }

  public range(rect: RectHV): Point2D[] {
    return this.points.filter((p) => rect.contains(p));
  }
}

export default PointSET;