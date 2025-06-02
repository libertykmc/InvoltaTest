import { XMLParser } from "fast-xml-parser";

export async function parseRss(url: string) {
  const res = await fetch(url);
  const xml = await res.text();

  const parser = new XMLParser();
  const json = parser.parse(xml);

  const items = json.rss?.channel?.item || [];
  return items.map((item: any) => ({
    title: item.title,
    link: item.link,
    description: item.description || "Описание отсутствует",
    pubDate: item.pubDate,
    source: new URL(url).hostname,
  }));
}
