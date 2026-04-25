export enum BloodlineRank {
  S = "S",
  A = "A",
  B = "B",
  C = "C",
  F = "F"
}

export interface YanLing {
  id: string;
  name: string;
  rank: BloodlineRank;
  description: string;
  effect: string;
  personality: string;
}

export interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    value: string;
    weights: Record<string, number>;
  }[];
}
