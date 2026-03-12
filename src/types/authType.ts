export type ApiResponse = {
  jwt: string;
  user: User;
};

export type EmailResponse = {
  ok: boolean;
};

export type ErrorResponse = {
  error?: {
    data: { error: { message: string } };
  };
};

export type User = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: true;
  blocked: false;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
