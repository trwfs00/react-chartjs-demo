import React, { useRef, useState } from 'react'
import ChartBox from '../ChartBox/ChartBox'
import { Box, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Line } from 'react-chartjs-2'
import CustomLegend from '../CustomLegend/CustomLegend'

const LineChart = ({ title, dataset, option, auctionType }) => {
  const chartRef = useRef(null)
  const [chartSize, setChartSize] = useState("All")

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom()
    }
  }

  const handleChange = e => {
    let size = e.target.value
    if (size) {
      setChartSize(size)
      if (chartRef.current && Number.isInteger(size)) {
        chartRef.current.zoomScale("x", { min: 0, max: size }, "default")
      }
    }
    console.log(chartRef.current.getZoomLevel())
  }

  return (
    <ChartBox title={title}>
        <Box sx={{ width: "auto", height: 450 }}>
          <Line
            ref={chartRef}
            options={option}
            data={dataset}
          />
        </Box>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='start'
          spacing={4}
          ml={13}
          mr={1}
          my={4}
        >
          <CustomLegend data={dataset} />
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography
              variant='subtitle1'
              sx={{ fontFamily: "Prompt, sans-serif", fontWeight: "regular", color: "#0B4E80" }}
            >
              Display No.
            </Typography>
            <FormControl>
              <Select
                size='small'
                value={chartSize}
                onChange={handleChange}
                sx={{ width: 100 }}
              >
                <MenuItem value='All' onClick={handleResetZoom}>
                  All
                </MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
    </ChartBox>
  )
}

export default LineChart