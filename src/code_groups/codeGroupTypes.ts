import { CreationSignature, EditionSignature } from "../common/commonTypes";

export interface CodeGroup {
  id: number;
  name: string;
  codeAmount: number;
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}
