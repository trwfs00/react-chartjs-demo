import React, { useRef, useState } from "react"
import ChartBox from "../ChartBox/ChartBox"
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material"
import { Line } from "react-chartjs-2"
import CustomLegend from "../CustomLegend/CustomLegend"
import chartOption from "../../utils/constraint/chartOption"

const renderOption = auctionType => {
  if (auctionType === 1) {
    return chartOption.SEALED_OPTION
  } else if (auctionType === 2) {
    return chartOption.SEALED_OPTION
  }
}

const renderBidHistory = ({ bidHistory, auctionType, viewPort }) => {
  if (auctionType === 1) {
    return chartOption.ENGLISH_BID_HISTORY
  } else {
    return chartOption.SEALED_BID_HISTORY
  }
}

const AuctionChart = ({ title, bidHistory, auctionType }) => {
  const chartRef = useRef(null)
  const [chartSize, setChartSize] = useState("All")
  const [selectedSupplier, setSelectedSupplier] = useState(-1)

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
  }

  // TODO: This is for chartRef by using Chart.js context function
  // const toggleLegendRef = (index) => {
  //   setSelectedSupplier(bidHistory.datasets[index].label)
  // }

  const filteredData = {
    labels: bidHistory.labels,
    datasets: bidHistory.datasets.filter(
      (_, index) => index === selectedSupplier
    ),
  }

  const toggleLegend = index => {
    if (index === selectedSupplier) {
      setSelectedSupplier(-1)
    } else {
      setSelectedSupplier(index)
    }
  }

  return (
    <ChartBox title={title}>
      <Box sx={{ minWidth: 900, width: "auto", height: 450 }}>
        <Line
          ref={chartRef}
          options={renderOption(auctionType)}
          data={selectedSupplier !== -1 ? filteredData : bidHistory}
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
        <CustomLegend
          data={bidHistory}
          onClick={toggleLegend}
          selectedSupplier={selectedSupplier}
          auctionType={auctionType}
        />
        <Stack direction='row' alignItems='center' spacing={2}>
          <Typography
            variant='subtitle1'
            sx={{
              fontFamily: "Prompt, sans-serif",
              fontWeight: "regular",
              color: "#0B4E80",
            }}
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

export default AuctionChart
