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
      pos: vec(16, -12),
    },
    {
      graphic: getSpriteWithSize(Images.slime1Image, 30),
      pos: vec(42, -15),
    },
    {
      graphic: getSpriteWithSize(Images.slime2Image, 36),
      pos: vec(75, -18),
    },
    {
      graphic: getSpriteWithSize(Images.slime3Image, 42),
      pos: vec(114, -21),
    },
    {
      graphic: getSpriteWithSize(Images.slime4Image, 48),
      pos: vec(158, -24),
    },
    {
      graphic: getSpriteWithSize(Images.slime5Image, 54),
      pos: vec(208, -27),
    },
    {
      graphic: getSpriteWithSize(Images.slime6Image, 60),
      pos: vec(264, -30),
    },
    {
      graphic: getSpriteWithSize(Images.slime7Image, 66),
      pos: vec(326, -33),
    },
    {
      graphic: getSpriteWithSize(Images.slime8Image, 72),
      pos: vec(395, -36),
    },
    {
      graphic: getSpriteWithSize(Images.slime9Image, 78),
      pos: vec(470, -39),
    },
    {
      graphic: getSpriteWithSize(Images.slime10Image, 84),
      pos: vec(550, -42),
    },
  ],
});

const fusionHintActor: Actor = new Actor({
  y: 1120,
  x: 320,
});

fusionHintActor.graphics.add(fusionHint);

export { hint, fusionHintActor };
