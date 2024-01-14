import { CreationSignature, EditionSignature } from "../common/commonTypes";

export interface Project {
  id: number;
  name: string;
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}
