import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

export default function Error({ message }) {

    return (
        message ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {message}
            </Alert>
          ) : null
    )
}