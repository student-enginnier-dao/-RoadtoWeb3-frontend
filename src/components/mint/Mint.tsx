import { useIsOpenMint, useMintSteps, useValidation } from "@/hooks/mintHooks";
import { Transition } from "@headlessui/react";
import dynamic from "next/dynamic";
import { CheckNFT } from "./CheckNFT";
import { CreateMapImage } from "./CreateMapImage";
import { GetLocation } from "./GetLocation";
import { SelectImage } from "./SelectImage";
import { UploadAndMint } from "./UploadAndMint";

const GenerateImage = dynamic(() => import("./GenerateImage"));

export const Mint = () => {
  const [isOpen, setOpen] = useIsOpenMint();

  return (
    <Transition
      show={isOpen}
      enter="transition-all duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-all duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="flex fixed inset-0 z-20 justify-center items-center backdrop-blur-sm"
        onClick={() => setOpen(false)}
      >
        <div
          className="overflow-x-hidden w-full h-full bg-slate-800 drop-shadow-lg sm:w-5/6 sm:max-w-screen-md sm:h-5/6 sm:rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <MintBody />
        </div>
      </div>
    </Transition>
  );
};

const MintBody = () => {
  const [currentStep, setStep] = useMintSteps();
  const validations = useValidation();
  const maxStep = 6;
  const nextStep = () => setStep(currentStep + 1);
  const backStep = () => setStep(currentStep - 1);
  return (
    <div className="flex overflow-hidden flex-col h-full">
      <div className="relative grow">
        <SelectImage />
        <GetLocation />
        <CreateMapImage />
        <CheckNFT />
        <GenerateImage />
        <UploadAndMint />
      </div>
      {currentStep < 6 && (
        <>
          <div className="flex gap-2 p-2 w-full">
            {currentStep > 1 && (
              <button className="home-button" onClick={backStep}>
                Back
              </button>
            )}
            <button
              className="home-button"
              onClick={nextStep}
              disabled={!validations[currentStep - 1]}
            >
              Next
            </button>
            <div className="text-4xl text-gray-400 ">
              {currentStep}/{maxStep}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
