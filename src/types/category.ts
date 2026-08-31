export type CategorySlug =
  | "sunflower-refined"
  | "sunflower-cold-pressed"
  | "rapeseed";

export interface ICategory {
  _id: string;
  slug: CategorySlug;
  name: string;
  order: number;
}
