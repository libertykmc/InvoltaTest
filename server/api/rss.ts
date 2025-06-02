import { parseRss } from "../utils/parseRss";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const source = (query.source as string) || "https://mos.ru/rss";

  return await parseRss(source);
});
