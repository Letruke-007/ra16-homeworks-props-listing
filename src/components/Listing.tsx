import React from "react";
import { RawItem, ListingItem } from "../types";

function formatPrice(price: string, currency: string): string {
  const num = Number(price);
  switch (currency) {
    case "USD": return `$${num.toFixed(2)}`;
    case "EUR": return `€${num.toFixed(2)}`;
    default: return `${num.toFixed(2)} ${currency}`;
  }
}

function getQuantityLevelClass(quantity: number): string {
  if (quantity <= 10) return "level-low";
  if (quantity <= 20) return "level-medium";
  return "level-high";
}

interface ListingProps {
  items: RawItem[];
}

// Маппинг строго типизирован: принимает только RawItem
function toListingItem(item: RawItem): ListingItem | null {
  if (
    typeof item.listing_id !== "number" ||
    typeof item.url !== "string" ||
    !item.MainImage ||
    typeof item.MainImage.url_570xN !== "string" ||
    typeof item.title !== "string" ||
    typeof item.currency_code !== "string" ||
    typeof item.price !== "string" ||
    typeof item.quantity !== "number"
  ) {
    return null;
  }

  return {
    listing_id: item.listing_id,
    url: item.url,
    MainImage: { url_570xN: item.MainImage.url_570xN },
    title: item.title,
    currency_code: item.currency_code,
    price: item.price,
    quantity: item.quantity,
  };
}

export const Listing: React.FC<ListingProps> = ({ items }) => {
  const filtered = items
    .map(toListingItem)
    .filter((item): item is ListingItem => !!item);

  return (
    <div className="item-list">
      {filtered.map(item => (
        <div className="item" key={item.listing_id}>
          <div className="item-image">
            <a href={item.url}>
              <img src={item.MainImage.url_570xN} alt={item.title} />
            </a>
          </div>
          <div className="item-details">
            <p className="item-title">
              {item.title.length > 50 ? item.title.slice(0, 50) + "…" : item.title}
            </p>
            <p className="item-price">{formatPrice(item.price, item.currency_code)}</p>
            <p className={`item-quantity ${getQuantityLevelClass(item.quantity)}`}>
              {item.quantity} left
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
