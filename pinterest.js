// Vercel serverless function: GET /api/pinterest  (optional ?board=board-name)
// Reads the public Pinterest RSS feed server-side (browsers can't, because of CORS)
// and returns clean JSON for the scrapbook wall. No API key or login needed.
const USER = "Toufikmahata20";

const decode = (s) =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
   .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
   .replace(/&amp;/g, "&");
const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]).trim() : "";
};

module.exports = async (req, res) => {
  const board = /^[A-Za-z0-9_-]+$/.test(req.query?.board || "") ? req.query.board : "";
  const path = board ? `${USER}/${board}` : USER;
  const sources = [
    `https://www.pinterest.com/${path}/feed.rss`,
    `https://in.pinterest.com/${path}/feed.rss`,
  ];

  let xml = "";
  for (const url of sources) {
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 8000);
      const r = await fetch(url, {
        signal: ctl.signal,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)", Accept: "application/rss+xml,text/xml,*/*" },
      });
      clearTimeout(timer);
      if (r.ok) { xml = await r.text(); if (xml.includes("<item>")) break; }
    } catch (e) { /* try the next source */ }
  }

  if (!xml.includes("<item>")) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(502).json({ error: "Pinterest feed unavailable", pins: [] });
  }

  const pins = (xml.match(/<item>[\s\S]*?<\/item>/g) || []).slice(0, 24).map((item) => {
    const link = tag(item, "link");
    const desc = tag(item, "description");
    const img = (desc.match(/<img[^>]+src=["']([^"']+)["']/i) || [])[1] || "";
    const text = desc.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    return {
      id: link || img,
      link,
      title: (tag(item, "title") || text).slice(0, 90),
      image: img.replace(/\/(236x|474x)\//, "/736x/"), // bigger version of the same pin
      date: tag(item, "pubDate"),
    };
  }).filter((p) => p.image && p.link);

  // fresh for 2 min at the edge, then served stale while it refreshes in the background
  res.setHeader("Cache-Control", "public, s-maxage=120, stale-while-revalidate=600");
  res.status(200).json({ user: USER, updated: new Date().toISOString(), pins });
};
