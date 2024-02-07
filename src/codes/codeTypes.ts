import { CreationSignature, EditionSignature } from "../common/commonTypes";

export interface Code {
  id: number;
  name: string;
  quotationAmount: number;
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}
