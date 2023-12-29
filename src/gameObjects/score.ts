import { Actor, Font, Text } from "excalibur";

const text = new Text({
  text: "SCORE: 0",
  font: new Font({ size: 36, family: "bungeeregular" }),
  maxWidth: 300,
});

const scoreText = new Actor({
  x: 320,
  y: 1000,
});

scoreText.graphics.use(text);

export { text, scoreText };
