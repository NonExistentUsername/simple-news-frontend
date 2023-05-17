import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

export default function Error({ message }) {

    return (
        message ? (
            <Alert severity="error" style={{ width: "100%", marginBottom: "10px", marginTop: "10px" }}>
              <AlertTitle>Error</AlertTitle>
              {message}
            </Alert>
          ) : null
    )
}