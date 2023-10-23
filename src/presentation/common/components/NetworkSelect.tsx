import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
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
  const handleChange = (event: SelectChangeEvent<Network>) => {
    const newNetwork = event.target.value as Network;
    onNetworkChange(newNetwork);
  };
  return (
    <FormControl>
      <InputLabel id="network-select-label">Network</InputLabel>
      <Select
        labelId="network-select-label"
        id="network-select"
        value={network}
        label={"Network"}
        onChange={handleChange}
      >
        {Object.keys(Network).map((key) => {
          const value = Network[key as keyof typeof Network];
          return (
            <MenuItem key={key} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
