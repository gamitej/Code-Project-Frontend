import React from "react";
import ReactApexChart from "react-apexcharts";
import { useGlobal } from "../../store/global/useGlobal";

const RadialChart = ({
  series = [67],
  height = 380,
  labels = ["Total Completion"],
}) => {
  const { darkMode } = useGlobal();

  const options = {
    chart: {
      height: 350,
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "16px",
            color: darkMode ? "white" : "grey",
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            color: darkMode ? "white" : "grey",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: labels,
  };

  return (
    <div className="dark:text-white">
      <ReactApexChart
        style={{ color: "white" }}
        options={options}
        series={series}
        type="radialBar"
        height={height}
      />
    </div>
  );
};

export default RadialChart;
