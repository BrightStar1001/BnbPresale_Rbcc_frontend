import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { calLogo, ethLogo, stEthLogo } from "../../assets/data";
import { getFormattedDisplayNumber } from '../../utils/constants';

function MarketClaimTable({userData, marketData, onClick}) {
  return (
    <div>
      <div className="flex font-bold w-full justify-center items-center text-2xl pb-3">Claim</div>
      {userData.map((marketItem, marketIndex) => {
        if(marketItem.length > 0) {
          return <div className='mb-8' key={marketIndex}>
            <div className="flex w-full justify-right items-center text-md pb-3">Market {marketIndex+1}</div>
            <table className="market-table grow">
              <thead>
                <tr>
                  <th width={150}>Bond Date</th>
                  <th width={110}>Paid</th>
                  <th width={160}>Vest Term</th>
                  <th className="flex items-center" width={220}>
                    <AccessTimeIcon/>
                    <span className="ml-2">Vest Over at</span>
                  </th>
                  <th width={140}>You will get</th>
                  <th width={120}></th>
                </tr>
              </thead>
              <tbody>
                {marketItem.map((data, itemIndex) => {
                  const overTime = parseFloat( (data.paidAt+marketData[marketIndex].vestingDuration)*1000 )
                  const nowTime = Date.now()
                  return (
                    <tr className="pt-3" key={itemIndex}>
                      <td>{new Date(parseFloat(data.paidAt) * 1000).toLocaleDateString()}</td>
                      <td>
                        <div className='flex items-center gap-2'>
                          <span>{getFormattedDisplayNumber(data.quoteTokenAmount)}</span>
                          <img src={marketData[marketIndex].quoteAsset==="ETH"?ethLogo:stEthLogo}/>
                        </div>
                      </td>
                      <td>{getFormattedDisplayNumber(parseFloat(marketData[marketIndex].vestingDuration) / 86400)} days</td>
                      <td>
                        <div className='flex items-center gap-10'>
                          {new Date(overTime).toLocaleDateString() } { new Date(overTime).toLocaleTimeString()}
                        </div>
                      </td>
                      <td>
                        <div className='flex items-center gap-2'>
                          <span>{getFormattedDisplayNumber(data.claimableTokenAmount)}</span>
                          <img src={calLogo}/>
                        </div>
                      </td>
                      <td>
                        <button className="primary-btn w-full" disabled={data.isClaimed || nowTime < overTime || data.pendingTx} onClick={()=> onClick(marketIndex, itemIndex)}>
                          {data.pendingTx&&<div className="loader"></div>}
                          {data.isClaimed?"Claimed":"Claim"}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        }
      })}
    </div>
  )
}

export default MarketClaimTable