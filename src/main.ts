import { Color, DisplayMode, Engine, Physics, vec } from "excalibur";
import { initializeBasket } from "./gameObjects/basket";
import { dropper } from "./gameObjects/dropper";
import { loader, music } from "./managers/assetsManager";
import { fusionHintActor, hint } from "./gameObjects/hint";
import { scoreText } from "./gameObjects/score";
import { initializeLimits } from "./gameObjects/limits";

import {
  AdMob,
  BannerAdOptions,
  BannerAdSize,
  BannerAdPosition,
} from "@capacitor-community/admob";
import { StatusBar } from "@capacitor/status-bar";
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

Physics.useRealisticPhysics();
Physics.acc = vec(0, 300);

const game = new Engine({
  width: 640,
  height: 1136,
  backgroundColor: Color.fromHex("#ff9c9c"),
  displayMode: DisplayMode.FitScreen,
});

game.start(loader).then(async () => {
  music.play(0.25);
  await StatusBar.hide();
});

initializeBasket(game);
initializeLimits(game);

game.add(dropper);
game.add(hint);
game.add(scoreText);
game.add(menuBtn);

async function initializeAds(): Promise<void> {
  await AdMob.initialize({
    initializeForTesting: true,
    requestTrackingAuthorization: true,
  });
}

async function enableBanner(): Promise<void> {
  const options: BannerAdOptions = {
    adId: "ca-app-pub-3940256099942544/6300978111",
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: true,
  };
  AdMob.showBanner(options);
}

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

initializeAds().then(() => enableBanner());
