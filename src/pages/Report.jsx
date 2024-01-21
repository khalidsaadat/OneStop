// App.js
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2"
import revenueData from "./data/revenueData";
import sourceData from "./data/sourceData.json";
import { PolarArea } from "react-chartjs-2";
import { Card } from "@material-tailwind/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function App() {

  function getData() {

  }

    return (
        <div>
        <Card className="items-center w-full">
        <Card id="test" className="max-w-sm">
          <label for='test'>hello</label>
            <Bar
            data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
                {
                label: "Gained Revenue",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                    "rgba(43, 63, 229, 0.8)"
                ],
                borderRadius: 3,
                },
                {
                    label: "Missed Revenue",
                    data: sourceData.map((data) => data.value),
                    backgroundColor: [
                    "rgba(250, 192, 19, 0.8)",
                    ],
                    borderRadius: 3,
                },
            ],
            }}
            options={{
            plugins: {
                title: {
                text: "Revenue Source",
                },
            },
            }}
        />
      </Card>
      <div className="w-full flex-row flex justify-center">
      <Card className="max-w-sm">
      <PolarArea
              data={{
                labels: revenueData.map((data) => data.label),
                datasets: [
                  {
                    label: "Count",
                    data: revenueData.map((data) => data.count),
                    backgroundColor: [
                      "rgba(43, 63, 229, 0.8)",
                      "rgba(250, 192, 19, 0.8)",
                      "rgba(253, 135, 135, 0.8)",
                      "rgba(120, 192, 19, 0.8)",
                      "rgba(203, 35, 135, 0.8)",
                    ],
                    borderRadius: 1,
                  },
                ],
              }}
      />
      </Card>
      <Card className="max-w-sm">
      <PolarArea
        data={{
            labels: revenueData.map((data) => data.label),
            datasets: [
                {
                label: "Count",
                data: revenueData.map((data) => data.revenue),
                backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                    "rgba(120, 192, 19, 0.8)",
                    "rgba(203, 35, 135, 0.8)",
                ],
                borderRadius: 1,
                },
            ],
        }}
      />
      </Card>
      </div>
      </Card>
      </div>
    );
}