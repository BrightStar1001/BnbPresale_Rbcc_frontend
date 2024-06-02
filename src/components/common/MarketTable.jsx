import LaunchIcon from '@mui/icons-material/Launch';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip } from '@mui/material';

import Arbitrum from "../../assets/icons/arbitrum.png"
import Ethereum from "../../assets/icons/ethereum.png"

import { BONDS, TOOLTIPS, calLogo, ethLogo, stEthLogo } from "../../assets/data";
import { getFormattedDisplayNumber } from '../../utils/constants';

function MarketTable({data, onClick}) {
  return (
    <div>
      <div className="flex font-bold w-full justify-center items-center text-2xl pb-3">Bonds</div>
      <table className="market-table grow">
        <thead>
          <tr>
            <th className="flex items-center" width={220}>
              <img src={Ethereum}/>
              <span className="ml-2">Bonds</span>
            </th>
            <th width={140}>Payout asset</th>
            <th width={100}>
              Discount 
              <Tooltip title={TOOLTIPS.discount}>
                <InfoOutlinedIcon className="ml-1"/>
              </Tooltip>
            </th>
            <th width={160}>Bond Price</th>
            <th width={160}>
              Purchased
              <Tooltip title={TOOLTIPS.purchased}>
                <InfoOutlinedIcon className="ml-1"/>
              </Tooltip>
            </th>
            <th width={120}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, key) => {
            return (
              <tr className="pt-5" key={key}>
                <td>
                  <div className='flex items-center gap-10'>
                    <img src={data.quoteAsset === "ETH"? ethLogo:stEthLogo}/>
                    <div className="flex flex-col">
                      <span>{data.quoteAsset}</span>
                      {data.getUrl && (
                        <span className="get-url">GET {data.quoteAsset} <LaunchIcon/></span>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div className='flex items-center gap-2'>
                    <img src={calLogo}/>
                    <span>{data.payoutAsset}</span>
                  </div>
                </td>
                <td>{getFormattedDisplayNumber(data.discount)}%</td>
                <td>${getFormattedDisplayNumber(data.bondPrice)}</td>
                <td>
                  <div className='flex items-center gap-2'>
                    <span>{getFormattedDisplayNumber(data.purchased)}</span>
                    <img src={ethLogo}/>
                  </div>
                </td>
                <td>
                  {data.bondType === 0?(
                    <button className="outlined-btn w-full disabled">Sold out</button>
                  ):(
                    <button className="primary-btn w-full" onClick={()=> onClick(data)}>Bond</button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MarketTable