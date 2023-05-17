import { CircularProgress } from '@material-ui/core'
import React from 'react'

export default function Loader() {
    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </div>
    )
}