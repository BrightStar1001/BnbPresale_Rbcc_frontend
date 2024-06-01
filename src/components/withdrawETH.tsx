import { Dialog, Transition, Switch } from '@headlessui/react'
import { Fragment, useState } from 'react'

type Props = {
    isWithdrawETHOpen: boolean;
    setIsWithdrawETHOpen: (status: boolean) => void;
    withdrawETHFn: (amount:string) => void;
}

export default function WithdrawETHModal({isWithdrawETHOpen, setIsWithdrawETHOpen, withdrawETHFn}: Props) {
    function closeModal() {
        setIsWithdrawETHOpen(false)
    }

    function withdrawETHClicked() {
        withdrawETHFn(amount);
        setIsWithdrawETHOpen(false)
    }

    const [amount, setAmount] = useState("0.0")

    return (
      <>
        <Transition appear show={isWithdrawETHOpen} as={Fragment}>
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
                        <div className="font-['inter'] detail-text small border-[#fff]/[.15] border-b text-[#a3a7bf]">WITHDRAW ETH</div>
                    </Dialog.Title>
                    <div className="mt-2">
                        <div className="flex flex-row items-start justify-between mt-2 text-[white]/[.80]">
                            <p className="w-1/2 pt-2">ETH amount</p>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => {
                                    if(e.target.value.length == 0)
                                        setAmount("0.0");
                                    else if(Number(e.target.value)>0)
                                        setAmount(e.target.value);
                                }}
                                className="w-1/2 h-10 outline-none px-2 font-inter font-bold text-[white]/[.80] text-xl bg-transparent border-[#ffa2001f] border rounded-md"
                            />
                        </div>
                    </div>
                    <div className="font-['inter'] detail-text small border-[#fff]/[.15] border-b text-[#a3a7bf] mt-2"></div>
                    <div className="flex justify-evenly mt-4">
                        <button
                            type="button"
                            className="px-2 py-1 w-32 bg-[#ffa200] rounded-md text-[black] font-inter sm:text-sm text-xs font-bold hover:text-[#ffa200] hover:bg-[#44361f] border-[#ffa200] border"
                            onClick={withdrawETHClicked}
                        >
                            Withdraw ETH
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