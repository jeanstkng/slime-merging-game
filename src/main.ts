// ES style import from excalibur
import { Color, Engine, Physics, vec } from "excalibur";
import { initializeBasket } from "./gameObjects/basket";
import { dropper } from "./gameObjects/dropper";
import { loader } from "./managers/assetsManager";
import { hint } from "./gameObjects/hint";
import { scoreText } from "./gameObjects/score";

Physics.useRealisticPhysics();
Physics.acc = vec(0, 300);

const game = new Engine({
  width: 1280,
  height: 720,
  backgroundColor: Color.fromHex("#ff9c9c"),
});

game.start(loader);

initializeBasket(game);

game.add(dropper);
game.add(hint);
game.add(scoreText);
