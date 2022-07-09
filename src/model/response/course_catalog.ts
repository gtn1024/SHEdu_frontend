export type CourseCatalog = {
  id?: number;
  name?: string;
  parent?: number;
};

export type CourseCatalogListResponse = {
  success?: boolean;
  message?: string;
  data?: CourseCatalog[];
};
