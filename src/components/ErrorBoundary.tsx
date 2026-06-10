import { Component, ReactNode } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { log } from '../services/logger';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    log('frontend', 'fatal', 'component', `Render error: ${error.message}`);
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container sx={{ py: 10, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Something went wrong.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Please refresh or try again.
          </Typography>
          <Button variant="contained" onClick={this.reset}>
            Try again
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}
