import { ReactElement, useState } from "react";
import { SelectNftStep } from "./SelectNftStep";
import { GeneratingStep } from "./GeneratingStep";
type Step = "selectNft" | "generating" | "done";
interface StepsProps {
  address: string;
}
export const Steps = ({ address }: StepsProps): ReactElement => {
  const initialStep = "selectNft";
  const [step, setStep] = useState<Step>(initialStep);
  return (
    <>
      {step == "selectNft" && <SelectNftStep />}
      {step == "generating" && <GeneratingStep />}
    </>
  );
};
