import { CreationSignature, EditionSignature } from "../common/commonTypes";

export interface Interview {
  id: number;
  name: string;
  text: string;
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}

export interface Quotation {
  id: number;
  lineNumber: number;
  text: string;
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}