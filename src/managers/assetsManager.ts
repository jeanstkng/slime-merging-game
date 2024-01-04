import { Color, ImageSource, Loader, Sound, Sprite } from "excalibur";
import { IImages } from "../interfaces/IImages";
import { base64Logo } from "../constants/images";

const Images: IImages = {
  slime0Image: new ImageSource("/slime_0.png"),
  slime1Image: new ImageSource("/slime_1.png"),
  slime2Image: new ImageSource("/slime_2.png"),
  slime3Image: new ImageSource("/slime_3.png"),
  slime4Image: new ImageSource("/slime_4.png"),
  slime5Image: new ImageSource("/slime_5.png"),
  slime6Image: new ImageSource("/slime_6.png"),
  slime7Image: new ImageSource("/slime_7.png"),
  slime8Image: new ImageSource("/slime_8.png"),
  slime9Image: new ImageSource("/slime_9.png"),
  slime10Image: new ImageSource("/slime_10.png"),
  moustacheImage: new ImageSource("/moustache.png"),
  basketImage: new ImageSource("/basket.png"),
  menuImage: new ImageSource("/menu.svg"),
};

const music: Sound = new Sound("/SlimeDropLoop.mp3");
music.loop = true;

const loader = new Loader([music]);
loader.loadingBarColor = Color.fromHex("#470808");
loader.backgroundColor = "#ff9c9c";

loader.startButtonFactory = () => {
  let buttonElement: HTMLButtonElement = document.getElementById(
    "excalibur-play"
  ) as HTMLButtonElement;
  if (!buttonElement) {
    buttonElement = document.createElement("button");
  }

  buttonElement.id = "excalibur-play";
  buttonElement.textContent = "PLAY";
  buttonElement.style.backgroundColor = "#90e5b4";
  buttonElement.style.fontFamily = "bungeeregular";
  buttonElement.style.color = "black";

  buttonElement.style.display = "none";
  return buttonElement;
};

loader.logo = base64Logo;

loader.logoHeight = 256;
loader.logoWidth = 256;

for (const key in Images) {
  const img: ImageSource = Images[key as keyof IImages];

  loader.addResource(img);
}

function getSpriteWithSize(image: ex.ImageSource, size: number) {
  return new Sprite({
    image: image,
    destSize: {
      width: size,
      height: size,
    },
  });
}

export { loader, Images, getSpriteWithSize, music };
