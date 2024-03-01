import "./App.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import zoomPlugin from "chartjs-plugin-zoom"
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material"
import ChartBox from "./components/ChartBox/ChartBox"
import "chartjs-plugin-zoom"
import chartOption from "./utils/constraint/chartOption"
import { data_english } from "./utils/constraint/dataset"
import { useRef, useState } from "react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  zoomPlugin,
  Title,
  Tooltip,
  Legend
)

function App() {
  const chartRef = useRef(null)
  const [chartSize, setChartSize] = useState(null)
  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom()
    }
  }

  const handleChange = event => {
    setChartSize(event.target.value)
    if (chartRef.current) {
      chartRef.current.zoomScale(
        "x",
        { min: 0, max: event.target.value },
        "default"
      )
    }
    console.log(chartRef.current.getZoomLevel())
  }

  return (
    <Container maxWidth='xl' className='App'>
      <ChartBox title='English - Reverse'>
        <Box sx={{ width: 800, height: 450 }}>
          <Line
            ref={chartRef}
            options={chartOption.zoomOption}
            data={data_english}
          />
        </Box>
        <Stack direction='row' spacing={2}>
          <FormControl fullWidth>
            <InputLabel id='select-graph-size-label'>ขนาดกราฟ</InputLabel>
            <Select
              labelId='select-graph-size-label'
              value={chartSize}
              size='small'
              label='ขนาด'
              onChange={handleChange}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          <Button variant='contained' onClick={handleResetZoom}>
            Reset
          </Button>
        </Stack>
      </ChartBox>
    </Container>
  )
}

export default App
