import fetch from 'node-fetch'

export async function fetchBitcoin() {
    const response = await fetch(
      "https://rest.coinapi.io/v1/exchangerate/BTC/USD/apikey-5674DB1C-B3EB-4C9E-8A52-7B8FAF180FA5",
    );
    const data = await response.json();
    const parse = parseInt(data.rate);
    const roundedPrice = Math.floor(parse);
    const finalprice = roundedPrice.toString();
    price = finalprice;
    console.log(price);
  }