import { Actor, Engine, Sprite } from "excalibur";
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

export const hint: Hint = new Hint({
  x: 1000,
  y: 100,
  width: 100,
  height: 100,
});
