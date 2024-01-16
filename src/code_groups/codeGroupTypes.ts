import { CreationSignature, EditionSignature } from "../common/commonTypes";

export interface CodeGroup {
  id: number;
  name: string;
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}
