import { Actor, ActorArgs, CollisionType, Engine, Vector } from "excalibur";
import { slimePoints, slimeVariants } from "../constants/slimeVariants";
import {
  gameState,
  getNextVariantIndex,
  setNextVariantIndex,
  setScore,
} from "../managers/gameManager";
import { Images, getSpriteWithSize } from "../managers/assetsManager";
import { IImages } from "../interfaces/IImages";
import { scoreText, text } from "./score";

class Slime extends Actor {
  private bounciness: number = 0.01;
  private hasCollided: boolean = false;

  onInitialize(engine: Engine): void {
    // this.graphics.use(
    //   getSpriteWithSize(
    //     Images[`slime${this.name}Image` as keyof IImages],
    //     this.width
    //   )
    // ); DESCOMENTAR

    this.body.bounciness = this.bounciness;
    this.body.friction = 15;
    this.body.canSleep = true;
    this.body.sleepMotion = 50;

    this.on("collisionstart", (event) => {
      if (
        event.contact.colliderB.owner.id === event.actor.id &&
        event.actor.name === event.other.name &&
        !this.hasCollided
      ) {
        setScore(gameState, gameState.score + slimePoints[event.actor.name]);
        text.text = `SCORE: ${gameState.score}`;
        scoreText.graphics.use(text);

        this.hasCollided = true;

        event.actor.kill();
        event.other.kill();

        setNextVariantIndex(
          gameState,
          getNextVariantIndex(event.actor.name, slimeVariants)
        );

        const slimeProps = slimeVariants[gameState.nextVariantIndex];

        const newSlime: Slime = generateSlime(
          event.contact.points[0],
          slimeProps
        );

        engine.add(newSlime);
      }
    });
  }
}

const generateSlime = (pos: Vector, props: ActorArgs): Slime =>
  new Slime({
    pos,
    collisionType: CollisionType.Active,
    ...props,
  });

export { generateSlime, Slime };
