import React from 'react'
import { Typography, Box } from '@mui/material'

export default function Error() {
	return (
        <Box textAlign='center'>
            <Typography variant="h5" style={{marginTop: 10}}>Product Not Found</Typography>
            <Typography color="secondary" style={{marginTop: 10}}>We can't find a product with the ID provided. Please double-check your link.</Typography>
        </Box>
    )
}