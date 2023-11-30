import { FormControl, Select, Option } from "@mui/joy";
import { Network } from "alchemy-sdk";
import { ReactElement } from "react";

interface NetworkSelectProps {
  onNetworkChange: (chain: Network) => void;
  network: Network;
}
export const NetworkSelect = ({
  onNetworkChange,
  network,
}: NetworkSelectProps): ReactElement => {
  const handleChange = (_: any, newNetwork: Network | null) => {
    if (!newNetwork) return;
    onNetworkChange(newNetwork);
  };
  return (
    <FormControl>
      <Select
        placeholder="Network"
        onChange={handleChange}
        defaultValue={network}
      >
        {Object.keys(Network).map((key) => {
          const value = Network[key as keyof typeof Network];
          return (
            <Option key={key} value={value}>
              {value}
            </Option>
          );
        })}
      </Select>
    </FormControl>
  );
};
