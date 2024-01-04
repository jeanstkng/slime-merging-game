import { ActorArgs, Color } from "excalibur";

const slimeVariants: ActorArgs[] = [
  {
    radius: 16,
    name: "0",
  },
  {
    radius: 22,
    name: "1",
  },
  {
    radius: 28,
    name: "2",
  },
  {
    radius: 34,
    name: "3",
  },
  {
    radius: 40,
    name: "4",
  },
  {
    radius: 46,
    name: "5",
  },
  {
    radius: 52,
    name: "6",
  },
  {
    radius: 58,
    name: "7",
  },
  {
    radius: 64,
    name: "8",
  },
  {
    radius: 70,
    name: "9",
  },
  {
    radius: 76,
    name: "10",
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
