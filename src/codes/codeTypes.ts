import { CreationSignature, EditionSignature } from "../common/commonTypes";

export interface Code {
  id: number;
  name: string;
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}
