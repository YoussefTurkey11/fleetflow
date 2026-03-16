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
  Phone?: string;
  email: string;
  provider?: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type UpdateUserPayload = {
  id: number;
  body: {
    username?: string;
    email?: string;
  };
};
