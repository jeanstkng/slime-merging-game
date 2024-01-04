import { Actor, ActorArgs, CollisionType, Engine, Vector } from "excalibur";
import { slimePoints, slimeVariants } from "../constants/slimeVariants";
import {
  gameState,
  getNextVariantIndex,
  setIsGameOver,
  setNextVariantIndex,
  setScore,
} from "../managers/gameManager";
import { Images, getSpriteWithSize } from "../managers/assetsManager";
import { IImages } from "../interfaces/IImages";
import { scoreText, text } from "./score";
import {
  deleteScoreById,
  getScoresDB,
  guidGenerator,
  initializeDB,
  putHighScoreDB,
} from "../managers/dbManager";

class Slime extends Actor {
  private bounciness: number = 0.01;
  private hasCollided: boolean = false;

  onInitialize(engine: Engine): void {
    this.graphics.use(
      getSpriteWithSize(
        Images[`slime${this.name}Image` as keyof IImages],
        this.width
      )
    );

    this.body.bounciness = this.bounciness;
    this.body.friction = 15;
    this.body.canSleep = true;
    this.body.sleepMotion = 50;

    this.on("collisionstart", async (event) => {
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

      if (event.other.body.group.name === "limits" && !gameState.isGameOver) {
        setIsGameOver(gameState, true);
        document.getElementById("gameover")!.style.display = "flex";
        this.kill();

        await initializeDB();

        const scores: any[] = await getScoresDB();
        const sortedScores = scores.sort((a, b) => a.score - b.score);

        if (scores.length > 0) {
          for (let index = 0; index < sortedScores.length; index++) {
            const element = sortedScores[index];
            if (gameState.score > element.score || scores.length < 3) {
              gameState.score > element.score &&
                (await deleteScoreById(element.id));
              await putHighScoreDB(gameState.score, guidGenerator());
              break;
            }
          }
        } else {
          await putHighScoreDB(gameState.score, guidGenerator());
        }
      }
    });
  }

  public update(_engine: Engine, _delta: number): void {
    if (gameState.isGameOver) {
      this.body.setSleeping(true);
    }
  }
}

const generateSlime = (pos: Vector, props: ActorArgs): Slime =>
  new Slime({
    pos,
    collisionType: CollisionType.Active,
    ...props,
  });

export { generateSlime, Slime };
