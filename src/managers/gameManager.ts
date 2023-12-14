import { ActorArgs } from "excalibur";
import { IGameState } from "../interfaces/IGameState";

const gameState: IGameState = {
  nextVariantIndex: getRandomVariantIndex(5),
  actualVariantIndex: getRandomVariantIndex(5),
  followingVariantIndex: getRandomVariantIndex(5),
  score: 0,
};

function setNextVariantIndex(state: IGameState, value: number): void {
  state.nextVariantIndex = value;
}

function setActualVariantIndex(state: IGameState, value: number): void {
  state.actualVariantIndex = value;
}

function setFollowingVariantIndex(state: IGameState, value: number): void {
  state.followingVariantIndex = value;
}

function setScore(state: IGameState, value: number): void {
  state.score = value;
}

function getRandomVariantIndex(variantLen: number): number {
  return Math.floor(Math.random() * variantLen);
}

function getNextVariantIndex(name: string, variants: ActorArgs[]): number {
  const nextVariantIndex: number =
    variants.findIndex(({ name: variantName }) => variantName === name) + 1;

  return nextVariantIndex >= variants.length
    ? nextVariantIndex - 1
    : nextVariantIndex;
}

export {
  getNextVariantIndex,
  getRandomVariantIndex,
  setNextVariantIndex,
  gameState,
  setActualVariantIndex,
  setFollowingVariantIndex,
  setScore,
};
