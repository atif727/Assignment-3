export type XErrorSources = {
  path: string | number;
  message: string;
}[];

export type XGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: XErrorSources;
};
