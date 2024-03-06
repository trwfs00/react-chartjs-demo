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
import options from "../../utils/constraint/chartOption"

const renderOption = reservedPrice => {
  return options(reservedPrice)
}

const AuctionChart = ({ title, bidHistory, auctionType, reservedPrice }) => {
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

  const renderLabels = () => {
    const datasets = bidHistory.datasets
    console.log(datasets)
    const longest = datasets.reduce(
      (maxDataset, currentDataset) =>
        currentDataset.data.length > maxDataset.data.length
          ? currentDataset
          : maxDataset,
      datasets[0]
    )
    console.log(longest)

    if (chartSize === "All") {
      if (longest.data.length < 10) {
        return {
          labels: Array.from({ length: 11 }, (_, index) => index.toString()),
        }
      }
      return {
        labels: Array.from(
          {
            length: longest.data.length + (Boolean(auctionType === 1) ? 0 : 1),
          },
          (_, index) => index.toString()
        ),
      }
    }

    if (Number.isInteger(chartSize)) {
      return {
        labels: Array.from({ length: chartSize + 1 }, (_, index) =>
          index.toString()
        ),
      }
    } else {
      return {
        labels: Array.from({ length: 11 }, (_, index) => index.toString()),
      }
    }
  }

  return (
    <ChartBox title={title}>
      <Box sx={{ minWidth: 900, width: "auto", height: 450 }}>
        <Line
          ref={chartRef}
          options={renderOption(reservedPrice)}
          data={
            selectedSupplier !== -1
              ? { ...filteredData, labels: renderLabels().labels }
              : { ...bidHistory, labels: renderLabels().labels }
          }
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
              <MenuItem value={10}>0-10</MenuItem>
              <MenuItem value={25}>0-25</MenuItem>
              <MenuItem value={50}>0-50</MenuItem>
              <MenuItem value={75}>0-75</MenuItem>
              <MenuItem value={100}>0-100</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </ChartBox>
  )
}

export default AuctionChart
