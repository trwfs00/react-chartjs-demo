import { Button } from "@mui/material"
import React, { useState } from "react"

const CustomLegend = ({ data, onClick, auctionType, selectedSupplier }) => {

  // TODO: This is for chartRef by using Chart.js context function
  // const [selectedSupplier, setSelectedSupplier] = useState(-1);
  // const toggleLegendRef = (index) => {
  //   if (chartRef) {
  //     const ci = chartRef.current.legend.chart;
  //     if (index === selectedSupplier) {
  //       setSelectedSupplier(-1);
  //       ci.data.datasets.map((dataset, i) => {
  //         ci.show(i);
  //         chartRef.current.legend.legendItems[i].hidden = false;
  //       })
  //     } else {
  //       setSelectedSupplier(index);
  //       ci.data.datasets.map((dataset, i) => {
  //         if (i === index) {
  //           ci.show(i);
  //           chartRef.current.legend.legendItems[i].hidden = false;
  //         } else {
  //           ci.hide(i);
  //           chartRef.current.legend.legendItems[i].hidden = true;
  //         }
  //       })
  //     }
  //   }
  // }

  const handleLegendClick = (index) => {
    if (onClick) {
      onClick(index);
    }
  };

  if (auctionType === 1) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: "12px",
        }}
      >
        {data.datasets.map((item, index) => (
          <span
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "32px",
              fontWeight: "600",
              fontFamily: "Prompt, sans-serif",
              color: "#0B4E80",
              fontSize: 14,
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: item.pointBackgroundColor,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: item.pointBorderColor,
                borderRadius: "50%",
                marginRight: "10px",
              }}
            ></div>
            <span>{item.label}</span>
          </span>
        ))}
      </div>
    )
  }
  if (auctionType === 2) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: "12px",
        }}
      >
        {data.datasets.map((item, index) => (
          <Button
            key={index}
            onClick={() => handleLegendClick(index)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "32px",
              fontWeight: "600",
              fontFamily: "Prompt, sans-serif",
              color: "#0B4E80",
              fontSize: 14,
              backgroundColor: selectedSupplier === index ? "#0B4E8015" : "transparent",
              outline: selectedSupplier === index ? "1px solid #0B4E8030" : 'none',
              opacity: Boolean(selectedSupplier === index || selectedSupplier === -1) ? 1 : 0.6
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: item.pointBackgroundColor,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: item.pointBorderColor,
                borderRadius: "50%",
                marginRight: "10px",
              }}
            ></div>
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    )
  }
}

export default CustomLegend
