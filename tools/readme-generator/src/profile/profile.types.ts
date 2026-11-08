export type Contact = {
  id: string;
  title: string;
  url: string;
};

export type Interest = {
  id: string;
  title: string;
  description: string;
};

export type Technology = {
  id: string;
  name: string;
  url: string;
};

export type TechnologyGroup = {
  id: string;
  title: string;
  items: Technology[];
};

export type Profile = {
  name: string;
  username: string;
  revisions: SourceRevisions;
  spokenLanguages: string[];
  birthPlace: string;
  residence: string;
  birthCountry: {
    name: string;
    url: string;
  };
  contacts: Contact[];
  interests: Interest[];
  technologies: TechnologyGroup[];
};

export type SourceRevisions = {
  lobby: string;
  resume: string;
};

export type ProfileDocuments = {
  personal: unknown;
  links: unknown;
  editorial: unknown;
  technologies: unknown;
};
