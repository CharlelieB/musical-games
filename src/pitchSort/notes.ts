export const NOTES = ["C3", "D3", "E3", "F3", "G3", "A3", "B3"] as const;

export type Note = (typeof NOTES)[number];
