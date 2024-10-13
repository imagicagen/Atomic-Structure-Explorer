export interface Element {
  name: string;
  symbol: string;
  atomicNumber: number;
  atomicMass: number;
  category: string;
  electronConfiguration: string;
  electronicConfiguration: string;
  valenceElectrons: number;
  oxidationStates: number[];
  group: number;
  period: number;
}