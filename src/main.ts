import { Color, Engine, Physics, vec } from "excalibur";
import { initializeBasket } from "./gameObjects/basket";
import { dropper } from "./gameObjects/dropper";
import { loader, music } from "./managers/assetsManager";
import { fusionHintActor, hint } from "./gameObjects/hint";
import { scoreText } from "./gameObjects/score";
import {
  initializeCloseMenu,
  initializeCloseRanking,
  initializeExitGame,
  initializeMuteMusic,
  initializeRanking,
  initializeRestart,
  initializeUnmuteMusic,
  menuBtn,
} from "./managers/uiManager";
import { initializeLimits } from "./gameObjects/limits";

Physics.useRealisticPhysics();
Physics.acc = vec(0, 300);

const game = new Engine({
  width: 1280,
  height: 720,
  backgroundColor: Color.fromHex("#ff9c9c"),
});

game.start(loader).then(async () => {
  music.play(0.25);
  music.loop = true;
});

initializeBasket(game);
initializeLimits(game);

game.add(dropper);
game.add(hint);
game.add(scoreText);
game.add(menuBtn);

initializeRestart(game, "restart");
initializeRestart(game, "restart_menu");
initializeRanking("rank");
initializeRanking("rank_menu");
initializeCloseRanking();
initializeCloseMenu();
initializeMuteMusic();
initializeUnmuteMusic();
initializeExitGame();

game.add(fusionHintActor);
