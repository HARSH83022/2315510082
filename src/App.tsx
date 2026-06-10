import { useEffect } from 'react';
import { Box, AppBar, Button, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { log } from './services/logger';

const navLinks = [
  { label: 'All Notifications', to: '/' },
  { label: 'Priority Notifications', to: '/priority' }
];

function App() {
  const location = useLocation();

  useEffect(() => {
    log('frontend', 'info', 'page', `Navigated to ${location.pathname}${location.search}`);
  }, [location]);

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h6">AffordMed Campus Hiring</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {navLinks.map((link) => (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                color="inherit"
                variant={location.pathname === link.to ? 'outlined' : 'text'}
                size="small"
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AppRoutes />
      </Container>
    </>
  );
}

export default App;
