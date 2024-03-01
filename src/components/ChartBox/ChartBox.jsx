import { Box, Typography } from "@mui/material"
import React from "react"

const ChartBox = ({ children, title }) => {
  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        p: 4,
        borderRadius: 2,
        boxShadow: "0px 0px 40px -18px rgba(0,0,0,0.1)",
        border: "1px solid #74747a20",
        width: 'fit-content',
        mx: 'auto',
      }}
    >
      <Typography variant='h4' textAlign="center" mb={2}>{title}</Typography>
      {children}
    </Box>
  )
}

export default ChartBox
