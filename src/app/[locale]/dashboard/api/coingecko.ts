export async function getMarketPrice(
  symbols: string[] = ["eth", "bnb"],
  sparkline = false
) {
  let markets = [];
  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&symbols=${symbols.join(
      ","
    )}&order=market_cap_desc&per_page=100&page=1&sparkline=${sparkline}&price_change_percentage=1h,24h,7d`;
    console.log("url: ", url);
    const res = await fetch(url, { next: { revalidate: 300 } });
    markets = await res.json();
    console.log("markets: ", markets);
  } catch (e: any) {
    console.log("failed", e.toString());
  }
  return markets;
}

export async function getHistoryPrices(id: string, interval = "daily") {
  let prices = [];
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=${interval}`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    prices = (await res.json()).prices;
  } catch (e: any) {
    console.log("failed", e.toString());
  }
  return prices;
}
