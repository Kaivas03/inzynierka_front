import { CreationSignature, EditionSignature } from "../common/commonTypes";

export type Position = {
  x: number;
  y: number;
};

export interface HypothesisItem {
  id: number;
  text: string;
  questionId: number;
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}

export interface QuestionRequest {
  posX: number;
  posY: number;
  text: string;
}

export interface SokNode {
  id: string;
  position: Position;
  text: string;
}

export interface SokEdge {
  id: string;
  source: string;
  target: string;
}
