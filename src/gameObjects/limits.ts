import { Actor, CollisionGroupManager, CollisionType, Engine } from "excalibur";

const limitsGroup = CollisionGroupManager.create("limits");

const upperLimit: Actor = new Actor({
  x: 640,
  y: 0,
  width: 640,
  height: 10,
  collisionGroup: limitsGroup,
});

const bottomLimit: Actor = new Actor({
  x: 640,
  y: 650,
  width: 640,
  height: 10,
  collisionGroup: limitsGroup,
});

const rightLimit: Actor = new Actor({
  x: 960,
  y: 335,
  width: 10,
  height: 640,
  collisionGroup: limitsGroup,
});

const leftLimit: Actor = new Actor({
  x: 320,
  y: 335,
  width: 10,
  height: 640,
  collisionGroup: limitsGroup,
});

const limits: Actor[] = [upperLimit, bottomLimit, rightLimit, leftLimit];

const initializeLimits = (game: Engine) => {
  limits.forEach((item) => {
    item.body.collisionType = CollisionType.Passive;
    game.add(item);
  });
};

export { initializeLimits, limitsGroup };
