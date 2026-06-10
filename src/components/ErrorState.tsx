import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Alert severity="error" sx={{ width: '100%', maxWidth: 600 }}>
        <AlertTitle>Error</AlertTitle>
        <Typography>{message}</Typography>
      </Alert>
      <Button variant="contained" onClick={onRetry}>
        Retry
      </Button>
    </Box>
  );
}
