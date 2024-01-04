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
  private canDrop: boolean = false;
  private rightLimit: number = 853;
  private leftLimit: number = 426;
  private upperLimit: number = 100;
  private actualSlimeDropping: ex.ActorArgs = {};
  private actualSlimeCircle!: ex.Actor;
  private readonly maxVariant: number = 5;

  public onInitialize(engine: ex.Engine): void {
    // this.graphics.add(getSpriteWithSize(Images.moustacheImage, 64)); DESCOMENTAR
    this.graphics.offset = new ex.Vector(30, 0);

    this.actualSlimeDropping = slimeVariants[gameState.actualVariantIndex];

    this.actualSlimeCircle = new ex.Actor({
      x: this.pos.x,
      y: this.pos.y,
      width: this.actualSlimeDropping.radius,
      height: this.actualSlimeDropping.radius,
    });

    // this.actualSlimeCircle.graphics.use(
    //   getSpriteWithSize(
    //     Images[`slime${gameState.actualVariantIndex}Image` as keyof IImages],
    //     this.actualSlimeDropping.radius!
    //   )
    // ); DESCOMENTAR

    engine.add(this.actualSlimeCircle);
    this._handleRightClick(engine);
    this._handleTouchEnd(engine);
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

      // this.actualSlimeCircle.graphics.use(
      //   getSpriteWithSize(
      //     Images[`slime${gameState.actualVariantIndex}Image` as keyof IImages],
      //     this.actualSlimeDropping.radius!
      //   )
      // ); DESCOMENTAR
    } else {
      this.dropCounter += delta;
    }

    const lastScreenMouseHorizontalPos: number =
      engine.input.pointers.at(0).lastScreenPos.x;
    if (
      lastScreenMouseHorizontalPos > this.leftLimit &&
      lastScreenMouseHorizontalPos < this.rightLimit &&
      !gameState.isGameOver
    ) {
      dropper.pos.x = engine.input.pointers.at(0).lastScreenPos.x;
    }
  }

  private _handleRightClick(engine: ex.Engine): void {
    engine.input.pointers.primary.on("down", (pe) => {
      if (
        pe.pointerType === ex.PointerType.Mouse &&
        pe.button === ex.PointerButton.Left &&
        this.canDrop &&
        !gameState.isGameOver &&
        pe.worldPos.x > this.leftLimit &&
        pe.worldPos.x < this.rightLimit &&
        pe.worldPos.y > this.upperLimit
      ) {
        this.canDrop = false;
        this.actualSlimeCircle.graphics.visible = false;

        const slimeProps = slimeVariants[gameState.actualVariantIndex];

        const slime: Slime = generateSlime(dropper.pos, slimeProps);

        engine.add(slime);
      }
    });
  }

  private _handleTouchEnd(engine: ex.Engine): void {
    engine.input.pointers.primary.on("up", (pe) => {
      if (
        pe.pointerType === ex.PointerType.Touch &&
        this.canDrop &&
        !gameState.isGameOver &&
        pe.worldPos.x > this.leftLimit &&
        pe.worldPos.x < this.rightLimit &&
        pe.worldPos.y > this.upperLimit
      ) {
        this.canDrop = false;

        const slimeProps = slimeVariants[0];

        const slime: Slime = generateSlime(dropper.pos, slimeProps);

        engine.add(slime);
      }
    });
  }
}

export const dropper: Dropper = new Dropper({
  x: 640,
  y: 60,
  width: 32,
  height: 32,
  color: ex.Color.Blue
});
