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
  ButtonGroup,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
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

  const handleChange = size => {
    setChartSize(size)
    if (chartRef.current) {
      chartRef.current.zoomScale("x", { min: 0, max: size }, "default")
    }
    console.log(chartRef.current.getZoomLevel())
  }

  return (
    <Container maxWidth='xl' className='App'>
      <ChartBox title='Sealed - Reverse'>
        <Box sx={{ width: 800, height: 420 }}>
          <Line
            ref={chartRef}
            options={chartOption.zoomOption}
            data={data_english}
          />
        </Box>
        <Stack direction='row' spacing={2} ml={5} mr={1} my={4}>
          <FormControl fullWidth>
            <ButtonGroup size='medium' aria-label='Graph Size' disableElevation>
              {[5, 10, 15, 20, 25, 30].map(size => (
                <Button
                  key={size}
                  variant={chartSize === size ? "contained" : "outlined"}
                  onClick={() => handleChange(size)}
                >
                  {size}
                </Button>
              ))}
            </ButtonGroup>
          </FormControl>
          <Button
            disableElevation
            variant='contained'
            onClick={handleResetZoom}
          >
            Reset
          </Button>
        </Stack>
      </ChartBox>
    </Container>
  )
}

export default App
