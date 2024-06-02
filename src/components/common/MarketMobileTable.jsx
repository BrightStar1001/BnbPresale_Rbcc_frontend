import LaunchIcon from '@mui/icons-material/Launch';

import { BONDS, calLogo, ethLogo, stEthLogo } from "../../assets/data";
import { getFormattedDisplayNumber } from '../../utils/constants';

function MarketMobileTable({data, onClick}) {
  return (
    <>
    <div className="flex w-full justify-center font-bold items-center text-2xl pt-3">Bonds</div>
      {data.map((data, key) => (
        <div className="market-mobile-item flex flex-wrap" key={key}>
          <div className="item flex flex-col">
            <div className="label">Bonds</div>
            <div className='flex items-center gap-1'>
              <img src={data.quoteAsset==="ETH"?ethLogo:stEthLogo}/>
              <div className="flex flex-col">
                <span>{data.quoteAsset}</span>
                {data.getUrl && (
                  <span className="get-url">GET {data.quoteAsset} <LaunchIcon/></span>
                )}
              </div>
            </div>
          </div>
          <div className="item flex flex-col">
            <div className="label">Payout Asset</div>
            <div className='flex items-center gap-2'>
              <img src={calLogo}/>
              <span>{data.payoutAsset}</span>
            </div>
          </div>
          <div className="item flex flex-col">
            <div className="label">Discount</div>
            <div>{getFormattedDisplayNumber(data.discount)}%</div>
          </div>
          <div className="item flex flex-col">
            <div className="label">Bond Price</div>
            <div>${getFormattedDisplayNumber(data.bondPrice)}</div>
          </div>
          <div className="item flex flex-col">
            <div className="label">Bond Price</div>
            <div>
              <div className='flex items-center gap-2'>
                <span>{getFormattedDisplayNumber(data.purchased)}</span>
                <img src={ethLogo}/>
              </div>
            </div>
          </div>
          <div className="w-full mt-5">
            {data.bondType === 0?(
              <button className="outlined-btn w-full disabled">Sold out</button>
            ):(
              <button className="primary-btn w-full" onClick={() => onClick(data)}>Bond</button>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default MarketMobileTable