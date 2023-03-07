import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const EmailInput = ({setEmail}) => {
  return (
    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
 
    <TextField onChange={(e)=>{setEmail(e.target.value)}} id="standard-basic" label="Email" variant="standard" />
  </Box>
  )
}
