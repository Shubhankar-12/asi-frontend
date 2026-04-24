import { CatalogBrowser } from "@/components/CatalogBrowser";
import { getAllItems } from "@/lib/items";

export default function HomePage() {
  return <CatalogBrowser items={getAllItems()} />;
}
