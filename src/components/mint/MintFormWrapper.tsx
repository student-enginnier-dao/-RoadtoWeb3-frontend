import { useMintSteps } from "@/hooks/mintHooks";
import { Transition } from "@headlessui/react";

export const MintFormWrapper: React.FC<{
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
