import { Box, Button, ButtonGroup, Typography } from '@mui/material';

const filterOptions = ['Placement', 'Result', 'Event'];

interface NotificationFilterProps {
  selected: string;
  onChange: (value: string) => void;
}

export default function NotificationFilter({ selected, onChange }: NotificationFilterProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
      <Typography variant="subtitle2">Filter notifications</Typography>
      <ButtonGroup variant="outlined" aria-label="Notification type filter">
        <Button
          onClick={() => onChange('')}
          variant={selected === '' ? 'contained' : 'outlined'}
        >
          All
        </Button>
        {filterOptions.map((value) => (
          <Button
            key={value}
            onClick={() => onChange(value)}
            variant={selected === value ? 'contained' : 'outlined'}
          >
            {value}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
