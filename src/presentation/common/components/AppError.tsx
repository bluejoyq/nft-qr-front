import { Alert, AlertTitle, Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { FallbackProps } from "react-error-boundary";
export const AppError = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error:</AlertTitle>
      {error.message}
      <Button onClick={resetErrorBoundary} color="success">
        <RestartAltIcon />
        Try again
      </Button>
    </Alert>
  );
};
