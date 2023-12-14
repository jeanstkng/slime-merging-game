import { ImageSource, Loader, Sprite } from "excalibur";
import { IImages } from "../interfaces/IImages";

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
};

const loader = new Loader();

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

export { loader, Images, getSpriteWithSize };
