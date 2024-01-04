import { Actor, Engine, GraphicsGroup, Sprite, vec } from "excalibur";
import { gameState } from "../managers/gameManager";
import { IImages } from "../interfaces/IImages";
import { getSpriteWithSize, Images } from "../managers/assetsManager";

class Hint extends Actor {
  public update(_engine: Engine, _delta: number): void {
    const actualSprite: Sprite = getSpriteWithSize(
      Images[`slime${gameState.followingVariantIndex}Image` as keyof IImages],
      this.width
    );

    if (
      this.graphics.current.length === 0 ||
      (this.graphics.current.length > 0 &&
        this.graphics.current[0].graphic.id !== actualSprite.id)
    ) {
      this.graphics.use(actualSprite);
    }
  }
}

const hint: Hint = new Hint({
  x: 64,
  y: 64,
  width: 100,
  height: 100,
});

hint.actions.repeat((repCtx) => {
  repCtx.moveBy(vec(10, 0), 10).moveBy(vec(-10, 0), 10);
});

const fusionHint = new GraphicsGroup({
  members: [
    {
      graphic: getSpriteWithSize(Images.slime0Image, 24),
      pos: vec(-12, 16),
    },
    {
      graphic: getSpriteWithSize(Images.slime1Image, 30),
      pos: vec(-15, 42),
    },
    {
      graphic: getSpriteWithSize(Images.slime2Image, 36),
      pos: vec(-18, 75),
    },
    {
      graphic: getSpriteWithSize(Images.slime3Image, 42),
      pos: vec(-21, 114),
    },
    {
      graphic: getSpriteWithSize(Images.slime4Image, 48),
      pos: vec(-24, 158),
    },
    {
      graphic: getSpriteWithSize(Images.slime5Image, 54),
      pos: vec(-27, 208),
    },
    {
      graphic: getSpriteWithSize(Images.slime6Image, 60),
      pos: vec(-30, 264),
    },
    {
      graphic: getSpriteWithSize(Images.slime7Image, 66),
      pos: vec(-33, 326),
    },
    {
      graphic: getSpriteWithSize(Images.slime8Image, 72),
      pos: vec(-36, 395),
    },
    {
      graphic: getSpriteWithSize(Images.slime9Image, 78),
      pos: vec(-39, 470),
    },
    {
      graphic: getSpriteWithSize(Images.slime10Image, 84),
      pos: vec(-42, 550),
    },
  ],
});

const fusionHintActor: Actor = new Actor({
  y: 360,
  x: 1000,
});

fusionHintActor.graphics.add(fusionHint);

export { hint, fusionHintActor };
