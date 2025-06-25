import { XMLParser } from "fast-xml-parser";

export async function parseRss(url: string) {
  const res = await fetch(url);
  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const json = parser.parse(xml);

  const items = json.rss?.channel?.item || [];

  return items.map((item: any) => {
    const imgFromEnclosure = item.enclosure?.url;
    const imgFromMedia = item["media:content"]?.url;

    const imgFromDescription = (() => {
      const match = item.description?.match(/<img[^>]+src="([^">]+)"/);
      return match?.[1];
    })();

    const image =
      imgFromEnclosure || imgFromMedia || imgFromDescription || "/nope.png";

    return {
      title: item.title,
      link: item.link,
      description: stripHtml(item.description) || "Описание отсутствует",
      pubDate: item.pubDate,
      source: new URL(url).hostname,
      image,
    };
  });
}

function stripHtml(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").trim();
}
