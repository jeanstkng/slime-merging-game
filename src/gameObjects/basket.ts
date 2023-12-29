import {
  Actor,
  CollisionGroupManager,
  CollisionType,
  Engine,
  vec,
} from "excalibur";
import { Images } from "../managers/assetsManager";

const basketGroup = CollisionGroupManager.create("basket");

const bottomBasket: Actor = new Actor({
  x: 320,
  y: 920,
  width: 537,
  height: 20,
  // color: Color.fromHex("#a60e0e"),
  collisionGroup: basketGroup,
});

const rightBasket: Actor = new Actor({
  x: 586.63,
  y: 610,
  width: 20,
  height: 640,
  // color: Color.fromHex("#a60e0e"),
  collisionGroup: basketGroup,
});

const leftBasket: Actor = new Actor({
  x: 53.33,
  y: 610,
  width: 20,
  height: 640,
  // color: Color.fromHex("#a60e0e"),
  collisionGroup: basketGroup,
});

const upperLeftBasket: Actor = new Actor({
  x: 41,
  y: 274,
  rotation: -10,
  width: 20,
  height: 50,
  // color: Color.fromHex("#a60e0e"),
  collisionGroup: basketGroup,
});

const upperRightBasket: Actor = new Actor({
  x: 599,
  y: 274,
  rotation: 10,
  width: 20,
  height: 50,
  // color: Color.fromHex("#a60e0e"),
  collisionGroup: basketGroup,
});

bottomBasket.graphics.add(Images.basketImage.toSprite());
bottomBasket.graphics.offset = vec(0, -350);

const basket: Actor[] = [
  bottomBasket,
  leftBasket,
  rightBasket,
  upperLeftBasket,
  upperRightBasket,
];

const initializeBasket = (game: Engine) => {
  basket.forEach((item) => {
    item.body.collisionType = CollisionType.Fixed;
    game.add(item);
  });
};

export { initializeBasket, basketGroup };
