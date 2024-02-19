import { CreationSignature, EditionSignature } from "../common/commonTypes";
import { Quotation } from "../interviews/interviewsTypes";

export interface Code {
  id: number;
  name: string;
  quotationAmount: number;
  quotations: Quotation[];
  codeGroupId: number;
  codeGroupName: string;
  creationSignature: CreationSignature;
  editionSignature: EditionSignature;
}
