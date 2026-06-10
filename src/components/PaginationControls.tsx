import { type ChangeEvent } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';

interface PaginationControlsProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export default function PaginationControls({ page, limit, total, onPageChange, onLimitChange }: PaginationControlsProps) {
  const pageCount = Math.max(1, Math.ceil(total / limit));

  const handlePage = (_event: ChangeEvent<unknown>, next: number) => {
    onPageChange(next);
  };

  const handleLimit = (event: SelectChangeEvent<string>) => {
    onLimitChange(Number(event.target.value));
  };

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2} sx={{ mt: 3 }}>
      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePage}
        color="primary"
        siblingCount={1}
        boundaryCount={1}
      />
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="limit-select-label">Per page</InputLabel>
          <Select
            labelId="limit-select-label"
            value={String(limit)}
            label="Per page"
            onChange={handleLimit}
          >
            {[5, 10, 20].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {total} total
      </Typography>
    </Stack>
  );
}
