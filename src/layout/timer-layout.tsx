import { Icon, IconType } from "@/components/icons";
import { usePresaleInfoStore } from "@/store/presaleInfo";
import { useAccount } from "wagmi";

type Props = {
  claimTokensFn: () => void;
}

export default function TimerLayout({ claimTokensFn }: Props) {
  const presaleStatus = usePresaleInfoStore((state) => state.presaleStatus);
  const transactionPending = usePresaleInfoStore((state) => state.transactionPending);
  const tokenClaimable = usePresaleInfoStore((state) => state.tokenClaimable);
  const claimableTokens = usePresaleInfoStore((state) => state.claimableTokens);
  const trxType = usePresaleInfoStore((state) => state.trxType);
  const account = useAccount();

  return (
    <div className="backdrop-blur-[2.5px] w-full h-[340px] sm:h-96 max-w-[700px] rounded-lg bg-[#a3a7bf]/[.03] px-8 sm:px-12 py-8 flex flex-col gap-3 sm:gap-5 border-[#ffa2001f] border transition_box">
      <div className="font-['inter'] detail-text small border-[#fff]/[.15] border-b">PRESALE STATUS AND CLAIM</div>
      <span className="font-inter font-bold text-[white] text-sm sm:text-lg">
        Claimable Tokens: {claimableTokens} MAZZE
      </span>
      <div className="w-full h-[140px] rounded-[8px] bg-[#a3a7bf]/[.03] py-[48px] shadow-[0_0_50px_0_#00000010] flex flex-row justify-center border-[#ffa2001f] border">
        <span className="xl:text-3xl text-2xl font-bold text-[#ffa200]">
          {presaleStatus == 0 ? "Presale is not activated." : (presaleStatus == 1 ? "Presale is in progress." : "Presale has been ended.")}
        </span>
      </div>
      <div className="flex flex-col items-center font-inter font-normal text-[white] text-xs sm:text-sm">
        <span className="text-center">
          {
            transactionPending || !account.address || !tokenClaimable
              ? "Claiming token is not available now."
              : "You can claim tokens."
          }
        </span>
      </div>
      <div className="flex flex-row justify-center">
        <button
          className={
            transactionPending || !account.address || !tokenClaimable
              ? "flex gap-[10px] justify-center items-center px-5 py-3 w-80 bg-[#ffa200] rounded-md text-[gray] font-inter sm:text-sm text-xs font-bold border-[#ffa200] border"
              : `px-5 py-3 w-80 bg-[#ffa200] rounded-md text-[black] font-inter sm:text-sm text-xs font-bold hover:text-[#ffa200] hover:bg-[#44361f] border-[#ffa200] border`
          }
          onClick={claimTokensFn}
          disabled={transactionPending || !account.address || !tokenClaimable}
        >
          CLAIM MAZZE
          {transactionPending && trxType == 1 &&(
          <Icon type={IconType.LOADING} className="w-14 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
