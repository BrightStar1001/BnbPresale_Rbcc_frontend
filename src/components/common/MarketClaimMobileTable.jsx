import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { BONDS, calLogo, ethLogo, stEthLogo } from "../../assets/data";
import { getFormattedDisplayNumber } from '../../utils/constants';

function MarketClaimMobileTable({userData, marketData, onClick}) {
  return (
    <>
      <div className="flex w-full justify-center font-bold items-center text-2xl pt-3">Claim</div>
      {userData.map((marketItem, marketIndex) => {
        if(marketItem.length>0){
          return marketItem.map((data, itemIndex) => {
            const overTime = parseFloat( (data.paidAt+marketData[marketIndex].vestingDuration)*1000 )
            const nowTime = Date.now()
            return <div className="market-mobile-item flex flex-wrap" key={itemIndex*marketIndex+itemIndex}>
              
              <div className="item flex flex-col">
                <div className="label">Bond Date</div>
                <div>{new Date(parseFloat(data.paidAt) * 1000).toLocaleDateString()}</div>
              </div>
              <div className="item flex flex-col">
                <div className="label">Paid</div>
                <div className='flex items-center gap-1'>
                  <div className="flex flex-col">
                    <span>{getFormattedDisplayNumber(data.quoteTokenAmount)}</span>
                  </div>
                  <img src={marketData[marketIndex].quoteAsset==="ETH"?ethLogo:stEthLogo}/>
                </div>
              </div>
              <div className="item flex flex-col">
                <div className="label">Vest Term</div>
                <div>{getFormattedDisplayNumber(parseFloat(marketData[marketIndex].vestingDuration) / 86400)} days</div>
              </div>
              <div className="item flex flex-col">
                <div className="label">Vest Over at</div>
                <div>{new Date(overTime).toLocaleDateString() } { new Date(overTime).toLocaleTimeString()}</div>
              </div>
              <div className="item flex flex-col">
                <div className="label">{data.isClaimed?"You got":"You will get"}</div>
                <div>
                  <div className='flex items-center gap-2'>
                    <span>{getFormattedDisplayNumber(data.claimableTokenAmount)}</span>
                    <img src={calLogo}/>
                  </div>
                </div>
              </div>
              <div className="w-full mt-5">
                <button className="primary-btn w-full" disabled={data.isClaimed || nowTime < overTime || data.pendingTx} onClick={()=> onClick(marketIndex, itemIndex)}>
                  {data.pendingTx&&<div className="loader"></div>}
                  {data.isClaimed?"Claimed":"Claim"}
                </button>
              </div>
            </div>
          })
        }
      })}
    </>
  )
}

export default MarketClaimMobileTable