import { Dialog, Transition, Switch } from '@headlessui/react'
import { Fragment, useState } from 'react'

type Props = {
    isCreatePresaleOpen: boolean;
    setIsCreatePresaleOpen: (status: boolean) => void;
    createPresaleFn: (maxTokens:string, tokenPriceStr:string, minPerWallet:string, maxPerWallet:string, whitelistEnabled:boolean) => void;
}

export default function CreatePresaleModal({isCreatePresaleOpen, setIsCreatePresaleOpen, createPresaleFn}: Props) {
    function closeModal() {
        setIsCreatePresaleOpen(false)
    }

    function createPresaleClicked() {
        createPresaleFn(maxTokens, tokenPriceStr, minPerWallet, maxPerWallet, whitelistEnabled);
        setIsCreatePresaleOpen(false)
    }

    const [whitelistEnabled, setWhitelistEnabled] = useState(false)
    const [maxTokens, setMaxTokens] = useState("1")
    const [tokenPriceStr, setTokenPriceStr] = useState("0.1")
    const [minPerWallet, setMinPerWallet] = useState("0.1")
    const [maxPerWallet, setMaxPerWallet] = useState("0.5")

    return (
      <>
        <Transition appear show={isCreatePresaleOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10 font-['inter']" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto font-['inter']">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-[#000520]/[.95] border-[gray] border p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="font-['inter'] detail-text small border-[#fff]/[.15] border-b text-[#a3a7bf]">CREATE PRESALE</div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="flex flex-row items-start justify-between mt-2 text-[white]/[.80]">
                        <p className="w-1/2 pt-2 font-['inter'] ">Hardcap Amount</p>
                        <input
                            value={maxTokens}
                            onChange={(e) => {
                                if(e.target.value.length == 0)
                                    setMaxTokens("0");
                                else if(Number(e.target.value)>0)
                                    setMaxTokens(e.target.value);
                            }}
                            className="w-1/2 h-10 outline-none px-2 font-inter font-bold text-[white]/[.80] text-xl bg-transparent border-[#ffa2001f] border rounded-md"
                        />
                    </div>
                    <div className="flex flex-row items-start justify-between mt-2 text-[white]/[.80]">
                        <p className="w-1/2 pt-2">Token Price</p>
                        <input
                            value={tokenPriceStr}
                            onChange={(e) => {
                                if(e.target.value.length == 0)
                                    setTokenPriceStr("0.0");
                                else if(Number(e.target.value)>0)
                                    setTokenPriceStr(e.target.value);
                            }}
                            className="w-1/2 h-10 outline-none px-2 font-inter font-bold text-[white]/[.80] text-xl bg-transparent border-[#ffa2001f] border rounded-md"
                        />
                    </div>
                    <div className="flex flex-row items-start justify-between mt-2 text-[white]/[.80]">
                        <p className="w-1/2 pt-2">Minimum Tokens / Wallet</p>
                        <input
                            value={minPerWallet}
                            onChange={(e) => {
                                if(e.target.value.length == 0)
                                    setMinPerWallet("0.0");
                                else if(Number(e.target.value)>0)
                                    setMinPerWallet(e.target.value);
                            }}
                            className="w-1/2 h-10 outline-none px-2 font-inter font-bold text-[white]/[.80] text-xl bg-transparent border-[#ffa2001f] border rounded-md"
                        />
                    </div>
                    <div className="flex flex-row items-start justify-between mt-2 text-[white]/[.80]">
                        <p className="w-1/2 pt-2">Maximum Tokens / Wallet</p>
                        <input
                            value={maxPerWallet}
                            onChange={(e) => {
                                if(e.target.value.length == 0)
                                    setMaxPerWallet("0.0");
                                else if(Number(e.target.value)>0)
                                    setMaxPerWallet(e.target.value);
                            }}
                            className="w-1/2 h-10 outline-none px-2 font-inter font-bold text-[white]/[.80] text-xl bg-transparent border-[#ffa2001f] border rounded-md"
                        />
                    </div>
                    <div className="flex flex-row items-start justify-between mt-4 text-[white]/[.80]">
                        <p>Enable Whitelist</p>
                        <Switch
                        checked={whitelistEnabled}
                        onChange={setWhitelistEnabled}
                        className={`${
                            whitelistEnabled ? 'bg-blue-600' : 'bg-gray-400'
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span
                                className={`${
                                    whitelistEnabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                  </div>
                  <div className="font-['inter'] detail-text small border-[#fff]/[.15] border-b text-[#a3a7bf] mt-2"></div>
                  <div className="flex justify-evenly mt-4">
                    <button
                        type="button"
                        className="px-2 py-1 w-32 bg-[#ffa200] rounded-md text-[black] font-inter sm:text-sm text-xs font-bold hover:text-[#ffa200] hover:bg-[#44361f] border-[#ffa200] border"
                        onClick={createPresaleClicked}
                    >
                        Create Presale
                    </button>
                    <button
                        type="button"
                        className="px-2 py-1 w-32 bg-[#ffa200] rounded-md text-[black] font-inter sm:text-sm text-xs font-bold hover:text-[#ffa200] hover:bg-[#44361f] border-[#ffa200] border"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                  </div>
                </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
}