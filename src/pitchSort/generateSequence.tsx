import { NOTES } from "./notes";

export function generateSequence(length = 4) {
  return Array.from(
    { length },
    () => NOTES[Math.floor(Math.random() * NOTES.length)],
  );
}
