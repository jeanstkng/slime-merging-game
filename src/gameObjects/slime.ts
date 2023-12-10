import { Actor, CollisionType, Color, Vector } from "excalibur";

const generateSlime = (pos: Vector): Actor =>
  new Actor({
    pos,
    radius: 30,
    color: Color.fromHex("#fff1f1"),
    collisionType: CollisionType.Active,
  });

export { generateSlime };
