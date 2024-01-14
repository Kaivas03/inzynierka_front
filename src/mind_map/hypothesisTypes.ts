import { CreationSignature, EditionSignature } from "../common/commonTypes";

type Position = {
  x: number;
  y: number;
};

export interface HypothesisItem {
  id: number;
  text: string;
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}

export interface SokNode {
  id: number;
  position: Position;
  data: { label: Element };
}

export interface SokEdge {
  id: string;
  source: number;
  target: number;
}
