import * as ex from "excalibur";
import { generateSlime } from "./slime";

class Dropper extends ex.Actor {
  private dropDelay: number = 3000;
  private dropCounter: number = 0;
  private canDrop: boolean = true;
  private bounciness: number = 0.01;

  public update(engine: ex.Engine, delta: number): void {
    if (this.dropCounter > this.dropDelay && !this.canDrop) {
      this.dropCounter = 0;
      this.canDrop = true;
    } else {
      this.dropCounter += delta;
    }

    const lastScreenMouseHorizontalPos: number =
      engine.input.pointers.at(0).lastScreenPos.x;
    if (
      lastScreenMouseHorizontalPos > 426 &&
      lastScreenMouseHorizontalPos < 853
    ) {
      dropper.pos.x = engine.input.pointers.at(0).lastScreenPos.x;
    }

    engine.input.pointers.primary.on("down", (pe) => {
      if (
        pe.pointerType === ex.PointerType.Mouse &&
        pe.button === ex.PointerButton.Left &&
        this.canDrop
      ) {
        this.canDrop = false;
        const slime: ex.Actor = generateSlime(dropper.pos);
        slime.body.bounciness = this.bounciness;
        slime.body.friction = 15;
        slime.body.canSleep = true;
        slime.body.sleepMotion = 50;
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
  width: 20,
  height: 20,
  color: ex.Color.Azure,
});
