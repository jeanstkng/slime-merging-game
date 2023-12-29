import { ActorArgs } from "excalibur";

const slimeVariants: ActorArgs[] = [
  {
    radius: 20,
    name: "0",
  },
  {
    radius: 28,
    name: "1",
  },
  {
    radius: 36,
    name: "2",
  },
  {
    radius: 44,
    name: "3",
  },
  {
    radius: 52,
    name: "4",
  },
  {
    radius: 60,
    name: "5",
  },
  {
    radius: 68,
    name: "6",
  },
  {
    radius: 76,
    name: "7",
  },
  {
    radius: 84,
    name: "8",
  },
  {
    radius: 92,
    name: "9",
  },
  {
    radius: 100,
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
