export async function getSummaryRelevantTweets(
  keywords: string
): Promise<{ summary: string }[]> {
  const originData: string =
    "- The Federal Reserve is buying back distressed firms' assets and the firms are investing the cash into equities.\n- Fed liquidity is flowing into the stock market.\n- JuiceboxDAO had a meeting discussing various topics including ETH Waterloo, hackathon reports, and legal templates.\n- DegenSpartan is returning the ETH he scammed back to the people.\n- Top 4 NFTs were featured on Bloomberg, marking a turning point for traditional network broadcast NFTs.\n- Starknet had updates on ETH staking, NethermindStark, DeFi pooling, and Nostra Finance's raise.\n- Over $984.08 was donated by 71 people, with the team able to stretch the money far.\n- LooksRare offered an 11 ETH airdrop for listing in June.\n- A summary page with categories including crypto, stonks, ultrashort bonds, and fiat was shared.\n- A brief overview of the crypto market, including Polygon, Ethscriptions, Azuki, and LST, was provided.\n- LooksRare was highlighted as a better option than Blur for farming and receiving an 11 ETH airdrop.\n- OneKeyHQ touch wallet and recovery phrase pad were praised for their quality.\n- The current and future stages of crypto and NFTs were discussed using Gartner's curve and BTC/ETH price curves.\n- MKR/ETH strength was analyzed in a thread.\n- An AI-generated nude portrait was sold for 175.0 ETH.\n- Azuki's project was praised, with hopes of reaching 100 ETH.\n- Staking on centralized exchanges (CEXs) has been falling since the Shanghai upgrade, while ETH deposits have increased.\n- MakerDAO's dominance in borrowing against ETH is ending, with Liquity becoming the new leader.\n- June's summary showed a rebound in metrics due to BTC spot ETF filings.\n- A friend was convinced to sign up for Coinbase and invest $1000 in crypto monthly.";

  const result = originData
    .replace(/-\s/g, "")
    .split("\n")
    .map((_) => {
      return { summary: _ };
    });
  // console.log("result: ", result);
  return result;
}
