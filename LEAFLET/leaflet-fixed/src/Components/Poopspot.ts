// types.ts
export type PoopSpot = {
  id: number;
  position: [number, number];
  description: string;
  reporter: string;
  photoUrl: string | null;
};
