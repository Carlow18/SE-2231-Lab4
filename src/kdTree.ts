import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";

class Node {
  point: Point2D;
  rect: RectHV;
  left: Node | null;
  right: Node | null;

  constructor(p: Point2D, rect: RectHV) {
    this.point = p;
    this.rect = rect;
    this.left = null;
    this.right = null;
  }
}

class KDTree {
  private root: Node | null;

  constructor() {
    this.root = null;
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  size(): number {
    return this.countNodes(this.root);
  }

  countNodes(node: Node | null): number {
    if (node === null) return 0;
    return 1 + this.countNodes(node.left) + this.countNodes(node.right);
  }

  insert(p: Point2D): void {
    this.root = this.addNode(this.root, p, null, 0);
  }

  addNode(
    node: Node | null,
    p: Point2D,
    rect: RectHV | null,
    depth: number
  ): Node {
    if (node === null) {
      let newRect: RectHV;
      if (rect === null) {
        newRect = new RectHV(0, 0, 1, 1);
      } else if (depth % 2 === 0) {
        newRect = new RectHV(rect.xmin, rect.ymin, Math.max(rect.xmax, p.y), Math.max(rect.ymax, p.y));
      } else {
        newRect = new RectHV(Math.min(rect.xmin, p.x), Math.min(rect.ymin, p.y), Math.max(rect.xmax, p.x), rect.ymax);
      }
      return new Node(p, newRect);
    }

    let cmp: number;
    if (depth % 2 === 0) {
      cmp = p.compareTo(node.point);
    } else {
      cmp = node.point.compareTo(p);
    }

    if (cmp < 0) {
      node.left = this.addNode(
        node.left,
        p,
        this.createRect(node.point, rect, depth, "left"),
        depth + 1
      );
    } else {
      node.right = this.addNode(
        node.right,
        p,
        this.createRect(node.point, rect, depth, "right"),
        depth + 1
      );
    }

    return node;
  }

  createRect(
    nodePoint: Point2D,
    rect: RectHV | null,
    depth: number,
    side: "left" | "right"
  ): RectHV {
    if (depth % 2 === 0) {
      if (side === "left") {
        return new RectHV(
          rect?.xmin ?? 0,
          rect?.ymin ?? 0,
          nodePoint.x,
          Math.max(rect?.ymax ?? 1, nodePoint.y)
        );
      } else {
        return new RectHV(
          nodePoint.x,
          rect?.ymin ?? 0,
          Math.max(rect?.xmax ?? 1, nodePoint.x),
          Math.max(rect?.ymax ?? 1, nodePoint.y)
        );
      }
    } else {
      if (side === "left") {
        return new RectHV(
          rect?.xmin ?? 0,
          rect?.ymin ?? 0,
          Math.max(rect?.xmax ?? 1, nodePoint.y),
          nodePoint.y
        );
      } else {
        return new RectHV(
          Math.min(rect?.xmin ?? 0, nodePoint.x),
          nodePoint.y,
          Math.max(rect?.xmax ?? 1, nodePoint.x),
          Math.max(rect?.ymax ?? 1, nodePoint.y)
        );
      }
    }
  }

  contains(p: Point2D): boolean {
    return this.findNode(this.root, p, 0) !== null;
  }

  findNode(node: Node | null, p: Point2D, depth: number): Node | null {
    if (node === null) return null;
    if (node.point.equals(p)) return node;

    let cmp: number;
    if (depth % 2 === 0) {
      cmp = p.compareTo(node.point);
    } else {
      cmp = node.point.compareTo(p);
    }

    if (cmp < 0) {
      return this.findNode(node.left, p, depth + 1);
    } else {
      return this.findNode(node.right, p, depth + 1);
    }
  }

  range(rect: RectHV): Point2D[] {
    const points: Point2D[] = [];
    this.searchRange(this.root, rect, points, 0);
    return points;
  }

  searchRange(
    node: Node | null,
    rect: RectHV,
    points: Point2D[],
    depth: number
  ): void {
    if (node === null) return;

    if (rect.contains(node.point)) {
      points.push(node.point);
    }

    if (node.left !== null && node.left.rect.intersects(rect)) {
      this.searchRange(node.left, rect, points, depth + 1);
    }

    if (node.right !== null && node.right.rect.intersects(rect)) {
      this.searchRange(node.right, rect, points, depth + 1);
    }
  }
}

export default KDTree;