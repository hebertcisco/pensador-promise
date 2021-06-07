export interface IPhrases {
  author: string;
  text: string;
}
export interface IResult {
  phrases: IPhrases[];
  next: boolean;
}
export interface IOptions {
  term: string;
  max: number;
}
