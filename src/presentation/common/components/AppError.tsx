import { Alert, Button, Typography } from "@mui/joy";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { FallbackProps } from "react-error-boundary";
export const AppError = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Alert color="danger">
      <Typography>Error:</Typography>
      {error.message}
      <Button onClick={resetErrorBoundary} color="success">
        <RestartAltIcon />
        Try again
      </Button>
    </Alert>
  );
};
