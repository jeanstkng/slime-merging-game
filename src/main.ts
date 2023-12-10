// ES style import from excalibur
import { Color, Engine, Physics, vec } from "excalibur";
import { initializeBasket } from "./gameObjects/basket";
import { dropper } from "./gameObjects/dropper";

// Create an instance of the engine.
// I'm specifying that the game be 800 pixels wide by 600 pixels tall.
// If no dimensions are specified the game will fit to the screen.
Physics.useRealisticPhysics();
Physics.acc = vec(0, 300);

const game = new Engine({
  width: 1280,
  height: 720,
  backgroundColor: Color.fromHex("#ff9c9c"),
});

game.start();

initializeBasket(game);

game.add(dropper);
