import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingSpinner() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 2 }}>
      <CircularProgress />
      <Typography variant="body1">Loading notifications...</Typography>
    </Box>
  );
}
