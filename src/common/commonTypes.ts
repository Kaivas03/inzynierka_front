export type AlterColor = "info" | "success" | "warning" | "error";

export interface CreationSignature {
  createdAt: string;
}

export interface EditionSignature {
  editedAt: string;
}

export interface ErrorInterface {
  message: string;
  code: string;
}

export interface SnackInterface {
  message: string;
  key: number;
  severity: AlterColor | undefined;
}
