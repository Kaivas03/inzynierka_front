import { CreationSignature, EditionSignature } from "../common/commonTypes";

export interface Project {
  id: number;
  name: string;
  description: string | null;
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}
