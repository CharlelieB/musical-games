import { NOTES } from "./notes";

export function generateSequence(length = 4) {
  //replace by fisher–yates later
  const shuffled = [...NOTES].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, length);
}
