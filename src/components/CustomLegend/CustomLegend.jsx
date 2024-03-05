import { Button } from "@mui/material"
import React from "react"

const CustomLegend = ({ data }) => {
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
        </Button>
      ))}
    </div>
  )
}

export default CustomLegend
