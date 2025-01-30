export type Url = {
    type: string;
    url: string;
  };
  
  export type Image = {
    path: string;
    extension: string;
  };
  
  export type ResourceList<T> = {
    available: number;
    returned: number;
    collectionURI: string;
    items: T[];
  };
  
  export type TextObject = {
    type: string;
    language: string;
    text: string;
  };
  
  export type ComicSummary = {
    resourceURI: string;
    name: string;
  };
  
  export type EventSummary = {
    resourceURI: string;
    name: string;
  };
  
  export type SeriesSummary = {
    resourceURI: string;
    name: string;
  };
  
  export type ComicDate = {
    type: string;
    date: Date;
  };
  
  export type ComicPrice = {
    type: string;
    price: number;
  };
  export type Character = {
    id: number;
    name: string;
    description: string;
    modified: Date;
    resourceURI: string;
    urls: Url[];
    thumbnail: Image;
    comics: ResourceList<ComicSummary>;
    stories: ResourceList<ComicSummary>;
    events: ResourceList<EventSummary>;
    series: ResourceList<SeriesSummary>;
  };
  export type Creator = {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    fullName: string;
    modified: Date;
    resourceURI: string;
    urls: Url[];
    thumbnail: Image;
    series: ResourceList<SeriesSummary>;
    stories: ResourceList<ComicSummary>;
    comics: ResourceList<ComicSummary>;
    events: ResourceList<EventSummary>;
  };
  export type Event = {
    id: number;
    title: string;
    description: string;
    resourceURI: string;
    urls: Url[];
    modified: Date;
    start: Date;
    end: Date;
    thumbnail: Image;
    comics: ResourceList<ComicSummary>;
    stories: ResourceList<ComicSummary>;
    series: ResourceList<SeriesSummary>;
    characters: ResourceList<Character>;
    creators: ResourceList<Creator>;
    next: EventSummary | null;
    previous: EventSummary | null;
  };
  export type Series = {
    id: number;
    title: string;
    description: string;
    resourceURI: string;
    urls: Url[];
    startYear: number;
    endYear: number;
    rating: string;
    modified: Date;
    thumbnail: Image;
    comics: ResourceList<ComicSummary>;
    stories: ResourceList<ComicSummary>;
    events: ResourceList<EventSummary>;
    characters: ResourceList<Character>;
    creators: ResourceList<Creator>;
    next: SeriesSummary | null;
    previous: SeriesSummary | null;
  };
  export type Story = {
    id: number;
    title: string;
    description: string;
    resourceURI: string;
    type: string;
    modified: Date;
    thumbnail: Image;
    comics: ResourceList<ComicSummary>;
    series: ResourceList<SeriesSummary>;
    events: ResourceList<EventSummary>;
    characters: ResourceList<Character>;
    creators: ResourceList<Creator>;
    originalIssue: ComicSummary;
  };
  export type Comic = {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: string;
    modified: Date;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects: TextObject[];
    resourceURI: string;
    urls: Url[];
    series: SeriesSummary;
    variants: ComicSummary[];
    collections: ComicSummary[];
    collectedIssues: ComicSummary[];
    dates: ComicDate[];
    prices: ComicPrice[];
    thumbnail: Image;
    images: Image[];
    creators: ResourceList<Creator>;
    characters: ResourceList<Character>;
    stories: ResourceList<Story>;
    events: ResourceList<EventSummary>;
  };
              