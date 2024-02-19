import { CreationSignature, EditionSignature } from "../common/commonTypes";

export interface Interview {
  id: number;
  name: string;
  text: string;
  quotationAmount: number;
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}

export interface Quotation {
  id: number;
  lineNumber: number;
  text: string;
  codeId: number;
  codeName: string;
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}
