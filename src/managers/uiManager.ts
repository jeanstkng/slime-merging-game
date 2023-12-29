import { Actor, Engine } from "excalibur";
import { slimeVariants } from "../constants/slimeVariants";
import { gameState, setIsGameOver, setScore } from "./gameManager";
import { scoreText, text } from "../gameObjects/score";
import { getScoresDB } from "./dbManager";
import { Images, music } from "./assetsManager";
import { App } from "@capacitor/app";

const initializeRestart = (game: Engine, id: string) => {
  document.getElementById(id)?.addEventListener("pointerup", () => {
    const slimeNames: (string | undefined)[] = slimeVariants.map(
      (slime) => slime.name
    );

    document.getElementById("gameover")!.style.display = "none";
    document.getElementById("menu")!.style.display = "none";

    game.currentScene.actors.forEach((actor) => {
      if (slimeNames.includes(actor.name)) {
        actor.kill();
      }
    });

    setIsGameOver(gameState, false);
    setScore(gameState, 0);
    text.text = `SCORE: ${gameState.score}`;
    scoreText.graphics.use(text);
  });
};

const initializeRanking = (id: string) => {
  document.getElementById(id)?.addEventListener("pointerup", async () => {
    document.getElementById("ranking")!.style.display = "block";

    const scores: any[] = await getScoresDB();
    const sortedScores = scores.sort((a, b) => b.score - a.score);

    console.log(sortedScores);

    sortedScores.forEach((item, idx) => {
      document.getElementById(`rank${idx + 1}`)!.innerText = item.score;
    });
  });
};

const initializeCloseRanking = () => {
  document
    .getElementById("close-ranking")
    ?.addEventListener("pointerup", () => {
      document.getElementById("ranking")!.style.display = "none";
    });
};

const initializeCloseMenu = () => {
  document.getElementById("close-menu")?.addEventListener("pointerup", () => {
    document.getElementById("menu")!.style.display = "none";
  });
};

const initializeMuteMusic = () => {
  document.getElementById("music")?.addEventListener("pointerup", () => {
    music.stop();
    document.getElementById("music_mute")!.style.display = "block";
    document.getElementById("music")!.style.display = "none";
  });
};

const initializeUnmuteMusic = () => {
  document.getElementById("music_mute")?.addEventListener("pointerup", () => {
    music.play();
    document.getElementById("music")!.style.display = "block";
    document.getElementById("music_mute")!.style.display = "none";
  });
};

const menuBtn = new Actor({
  x: 600,
  y: 40,
  width: 40,
  height: 40,
});

menuBtn.graphics.add(Images.menuImage.toSprite());

menuBtn.on("pointerup", () => {
  document.getElementById("menu")!.style.display = "grid";
});

const initializeExitGame = () => {
  document.getElementById("exit")?.addEventListener("pointerup", () => {
    App.exitApp();
  });
};

export {
  initializeRestart,
  initializeRanking,
  initializeCloseRanking,
  menuBtn,
  initializeCloseMenu,
  initializeMuteMusic,
  initializeUnmuteMusic,
  initializeExitGame
};
