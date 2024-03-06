import React, { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import CustomLegend from "./CustomLegend/CustomLegend";
import { Box, Grid } from "@mui/material";

const data = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Dataset 1",
      data: [65, 59, 80, 81, 56],
      borderColor: "rgb(75, 192, 192)",
      fill: false,
    },
    {
      label: "Dataset 2",
      data: [28, 48, 40, 19, 86],
      borderColor: "rgb(255, 99, 132)",
      fill: false,
    },
    // Add more datasets as needed
  ],
};

const CustomLegendChart = () => {
  const chartRef = useRef(null);

  const handleLegendItemClick = (index) => {
    console.log(chartRef)
    const ci = chartRef.current.legend.chart;
    if (ci.isDatasetVisible(index)) {
        ci.hide(index);
        chartRef.current.legend.legendItems[index].hidden = true;
    } else {
        ci.show(index);
        chartRef.current.legend.legendItems[index].hidden = false;
    }
  };

  const legend = {
    display: false, // Setting this to false as we are using the custom legend 
  };

  const options = {
    plugins: {
      legend: legend,
    },
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Box sx={{ width: "100%", height: 450 }}>
          <Line ref={chartRef} data={data} options={options} />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <CustomLegend data={data} onClick={handleLegendItemClick} />
      </Grid>
    </Grid>
  );
};

export default CustomLegendChart;
