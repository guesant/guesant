export type SourceDownloader = {
  download(url: string): Promise<string>;
};

export type ResponseTextReader = {
  responseText(response: Response): Promise<string>;
};

export type SourceRequestAuthorizer = {
  headers(url: URL): Record<string, string>;
};
