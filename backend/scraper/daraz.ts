import puppeteer from "puppeteer";

export async function scrapeDaraz(query: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const encodedSearchTerm = encodeURIComponent(query);
  const url = `https://www.daraz.com.bd/smartphones/?q=${encodedSearchTerm}`;

  await page.goto(url, { waitUntil: "domcontentloaded" });

  // Wait for product cards to load
  await page.waitForSelector("[data-qa-locator='product-item']", {
    timeout: 10000,
  });
  if (!query || query.trim().length === 0) {
  return [];
}

  const results = await page.evaluate(() => {
    const cards = document.querySelectorAll("[data-qa-locator='product-item']");
    const data = [];

    cards.forEach((card) => {
      const title = card.querySelector("a[title]")?.getAttribute("title") ?? "";
      const href = card.querySelector("a[title]")?.getAttribute("href") ?? "";
      const link = href.startsWith("http") ? href : `https:${href}`;
      const priceText = card.querySelector("span.ooOxS")?.textContent ?? "";
      const price = priceText.replace(/[^\d]/g, "");
      const location =
        card.querySelector("span.oa6ri")?.textContent ?? "Unknown";

      if (title && price && link) {
        data.push({
          title,
          price,
          link,
          source: "Daraz",
          condition: "new",
          location,
        });
      }
    });

    return data;
  });

  await browser.close();
  return results;
}
