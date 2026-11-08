export type ReadmeTemplateInput = {
  name: string;
  languages: string;
  hobbies: string;
  social: string;
  birthPlace: string;
  residence: string;
  technologies: string;
  birthCountryBadge: string;
};

export type ReadmeTemplate = {
  readmeTemplate(content: ReadmeTemplateInput): string;
};
