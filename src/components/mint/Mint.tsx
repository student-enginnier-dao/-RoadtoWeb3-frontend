import { useIsOpenMint, useMintSteps, useValidation } from "@/hooks/mintHooks";
import { Transition } from "@headlessui/react";
import { GetLocation } from "./GetLocation";
import { SelectImage } from "./SelectImage";

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
          className="overflow-x-hidden w-full h-full bg-slate-800 drop-shadow-lg sm:w-4/5 sm:max-w-lg sm:h-4/5 sm:rounded-lg"
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
  const maxStep = 7;
  const nextStep = () => setStep(currentStep + 1);
  const backStep = () => setStep(currentStep - 1);
  return (
    <div className="flex overflow-hidden flex-col h-full">
      <div className="relative grow">
        <SelectImage />
        <GetLocation />
        <MintFormWrapper step={3}>
          <h1 className="font-anton text-4xl text-white">Step3</h1>
          <h1 className="font-anton text-4xl text-white">Step3</h1>
          <h1 className="font-anton text-4xl text-white">Step3</h1>
        </MintFormWrapper>
        <MintFormWrapper step={4}>
          <h1 className="font-anton text-4xl text-white">Step4</h1>
        </MintFormWrapper>
      </div>
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
    </div>
  );
};
const MintFormWrapper: React.FC<{
  step: number;
  className?: string;
  children?: React.ReactNode;
}> = ({ step, children, className }) => {
  const [currentStep] = useMintSteps();
  return (
    <Transition
      show={currentStep === step}
      className={`w-full h-full flex flex-col  text-white ${className}`}
      enter="transition-all duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition-all duration-300"
      leaveFrom="translate-x-0 absolute"
      leaveTo="-translate-x-full absolute"
    >
      {children}
    </Transition>
  );
};
