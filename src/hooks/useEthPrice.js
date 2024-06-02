import { useEffect, useState } from "react"

const useEthPrice = () => {
    const [ethPrice, setEthPrice] = useState(0)

    useEffect(() => {
        const fetchEthPrice = async () => {      try {
            const response = await fetch(
              "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
            );
            const data = await response.json();
            if (data.ethereum && data.ethereum.usd) {
              setEthPrice(data.ethereum.usd);
            }
          } catch (error) {
            console.error("Failed to fetch Ethereum price:", error);
          }
        }

        fetchEthPrice();
    })
    return ethPrice
}

export default useEthPrice