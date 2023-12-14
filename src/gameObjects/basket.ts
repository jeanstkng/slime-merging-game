import {
  Actor,
  CollisionGroupManager,
  CollisionType,
  Color,
  Engine,
} from "excalibur";

const basketGroup = CollisionGroupManager.create("basket");

const bottomBasket: Actor = new Actor({
  x: 640,
  y: 600,
  width: 420,
  height: 20,
  color: Color.fromHex("#a60e0e"),
  collisionGroup: basketGroup,
});

const rightBasket: Actor = new Actor({
  x: 853,
  y: 360,
  width: 20,
  height: 500,
  color: Color.fromHex("#a60e0e"),
  collisionGroup: basketGroup,
});

const leftBasket: Actor = new Actor({
  x: 426,
  y: 360,
  width: 20,
  height: 500,
  color: Color.fromHex("#a60e0e"),
  collisionGroup: basketGroup,
});

const upperLeftBasket: Actor = new Actor({
  x: 414,
  y: 95,
  rotation: -10,
  width: 20,
  height: 50,
  color: Color.fromHex("#a60e0e"),
  collisionGroup: basketGroup,
});

const upperRightBasket: Actor = new Actor({
  x: 865,
  y: 95,
  rotation: 10,
  width: 20,
  height: 50,
  color: Color.fromHex("#a60e0e"),
  collisionGroup: basketGroup,
});

const basket: Actor[] = [
  bottomBasket,
  leftBasket,
  rightBasket,
  upperLeftBasket,
  upperRightBasket
];

const initializeBasket = (game: Engine) => {
  basket.forEach((item) => {
    item.body.collisionType = CollisionType.Fixed;
    game.add(item);
  });
};

export { initializeBasket, basketGroup };
