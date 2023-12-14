import * as ex from "excalibur";
import { Slime, generateSlime } from "./slime";
import { slimeVariants } from "../constants/slimeVariants";
import {
  gameState,
  getRandomVariantIndex,
  setActualVariantIndex,
  setFollowingVariantIndex,
} from "../managers/gameManager";
import { Images, getSpriteWithSize } from "../managers/assetsManager";
import { IImages } from "../interfaces/IImages";

class Dropper extends ex.Actor {
  private dropDelay: number = 1500;
  private dropCounter: number = 0;
  private canDrop: boolean = true;
  private rightLimit: number = 853;
  private leftLimit: number = 426;
  private actualSlimeDropping: ex.ActorArgs = {};
  private actualSlimeCircle!: ex.Actor;
  private readonly maxVariant: number = 5;

  public onInitialize(engine: ex.Engine): void {
    this.graphics.add(getSpriteWithSize(Images.moustacheImage, 64));
    this.graphics.offset = new ex.Vector(30, 0);

    this.actualSlimeDropping = slimeVariants[gameState.actualVariantIndex];

    this.actualSlimeCircle = new ex.Actor({
      x: this.pos.x,
      y: this.pos.y,
      width: this.actualSlimeDropping.radius,
      height: this.actualSlimeDropping.radius,
    });

    this.actualSlimeCircle.graphics.use(
      getSpriteWithSize(
        Images[`slime${gameState.actualVariantIndex}Image` as keyof IImages],
        this.actualSlimeDropping.radius!
      )
    );

    engine.add(this.actualSlimeCircle);
  }

  public update(engine: ex.Engine, delta: number): void {
    this.actualSlimeCircle.pos = this.pos;

    if (this.dropCounter > this.dropDelay && !this.canDrop) {
      this.dropCounter = 0;
      this.canDrop = true;

      setActualVariantIndex(gameState, gameState.followingVariantIndex);

      setFollowingVariantIndex(
        gameState,
        getRandomVariantIndex(this.maxVariant)
      );

      this.actualSlimeDropping = slimeVariants[gameState.actualVariantIndex];

      this.actualSlimeCircle.graphics.use(
        getSpriteWithSize(
          Images[`slime${gameState.actualVariantIndex}Image` as keyof IImages],
          this.actualSlimeDropping.radius!
        )
      );
    } else {
      this.dropCounter += delta;
    }

    const lastScreenMouseHorizontalPos: number =
      engine.input.pointers.at(0).lastScreenPos.x;
    if (
      lastScreenMouseHorizontalPos > this.leftLimit &&
      lastScreenMouseHorizontalPos < this.rightLimit
    ) {
      dropper.pos.x = engine.input.pointers.at(0).lastScreenPos.x;
    }

    this._handleRightClick(engine);
  }

  private _handleRightClick(engine: ex.Engine): void {
    engine.input.pointers.primary.on("down", (pe) => {
      if (
        pe.pointerType === ex.PointerType.Mouse &&
        pe.button === ex.PointerButton.Left &&
        this.canDrop
      ) {
        this.canDrop = false;

        const slimeProps = slimeVariants[gameState.actualVariantIndex];

        const slime: Slime = generateSlime(dropper.pos, slimeProps);

        engine.add(slime);
      } else if (pe.pointerType === ex.PointerType.Touch) {
        ex.Logger.getInstance().info("Touch event:", pe);
      }
    });
  }
}

export const dropper: Dropper = new Dropper({
  x: 1280 / 2,
  y: 60,
});
