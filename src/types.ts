// types.ts
export interface RawMainImage {
  url_570xN?: string;
  [key: string]: unknown;
}

export interface RawItem {
  listing_id?: number;
  url?: string;
  MainImage?: RawMainImage;
  title?: string;
  currency_code?: string;
  price?: string;
  quantity?: number;
  [key: string]: unknown;

export interface MainImage {
  url_570xN: string;
}

export interface ListingItem {
  listing_id: number;
  url: string;
  MainImage: MainImage;
  title: string;
  currency_code: string;
  price: string;
  quantity: number;
}
