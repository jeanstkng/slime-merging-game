import { Actor, CollisionType, Color, Engine } from "excalibur";

const bottomBasket: Actor = new Actor({
  x: 640,
  y: 600,
  width: 420,
  height: 20,
  color: Color.fromHex("#a60e0e"),
});

const rightBasket: Actor = new Actor({
  x: 853,
  y: 360,
  width: 20,
  height: 500,
  color: Color.fromHex("#a60e0e"),
});

const leftBasket: Actor = new Actor({
  x: 426,
  y: 360,
  width: 20,
  height: 500,
  color: Color.fromHex("#a60e0e"),
});

const basket: Actor[] = [bottomBasket, leftBasket, rightBasket];

const initializeBasket = (game: Engine) => {
  basket.forEach((item) => {
    item.body.collisionType = CollisionType.Fixed;
    game.add(item);
  });
};

export { initializeBasket };
