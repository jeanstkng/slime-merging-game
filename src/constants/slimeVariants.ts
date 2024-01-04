import { ActorArgs, Color } from "excalibur";

const slimeVariants: ActorArgs[] = [
  {
    radius: 16,
    name: "0",
    color: Color.Cyan,
  },
  {
    radius: 22,
    name: "1",
    color: Color.Chartreuse,
  },
  {
    radius: 28,
    name: "2",
    color: Color.Green,
  },
  {
    radius: 34,
    name: "3",
    color: Color.LightGray,
  },
  {
    radius: 40,
    name: "4",
    color: Color.Magenta,
  },
  {
    radius: 46,
    name: "5",
    color: Color.Red,
  },
  {
    radius: 52,
    name: "6",
    color: Color.Rose,
  },
  {
    radius: 58,
    name: "7",
    color: Color.Yellow,
  },
  {
    radius: 64,
    name: "8",
    color: Color.White,
  },
  {
    radius: 70,
    name: "9",
    color: Color.ExcaliburBlue,
  },
  {
    radius: 76,
    name: "10",
    color: Color.Orange,
  },
];

const slimePoints: Record<string, number> = {
  ["0"]: 5,
  ["1"]: 10,
  ["2"]: 15,
  ["3"]: 20,
  ["4"]: 25,
  ["5"]: 30,
  ["6"]: 35,
  ["7"]: 40,
  ["8"]: 45,
  ["9"]: 50,
  ["10"]: 55,
};

export { slimeVariants, slimePoints };
