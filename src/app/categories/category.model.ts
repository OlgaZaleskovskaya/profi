export class Category {
  id: string;
  name: string;
  tags: {id: string, name: string}[];
  constructor(id: string, category: string, subcategories: {id: string, name: string}[]) {
    this.id = id;
    this.name = category;
    this.tags = subcategories;
  }
}
