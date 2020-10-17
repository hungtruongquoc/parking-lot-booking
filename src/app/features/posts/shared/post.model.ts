export class Post {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public author: string,
    public date: Date
  ) {}
}
