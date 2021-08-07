type TypeItem = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';

export interface IItem {
  id: number;
  by: string;
  title: string;
  score: number;
  url: string;
  type: TypeItem;
  time: number;
  karma?: number;
}

export interface IAuthor {
  id: string;
  karma: number;
}
