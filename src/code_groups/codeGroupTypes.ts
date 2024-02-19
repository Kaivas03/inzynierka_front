import { Code } from "../codes/codeTypes";
import { CreationSignature, EditionSignature } from "../common/commonTypes";

export interface CodeGroup {
  id: number;
  name: string;
  codeAmount: number;
  codes: Code[];
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}
