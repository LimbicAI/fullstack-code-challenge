export type PaginationParams = {
  limit?: number | null;
  offset?: number | null;
};

export type NonNullableObject<T> = {
  [P in keyof T]-?: T[P] extends object ? NonNullableObject<T[P]> : NonNullable<T[P]>;
};
