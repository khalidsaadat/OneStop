// App.js
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2"
import revenueData from "./data/revenueData";
import sourceData from "./data/sourceData.json";
import { PolarArea } from "react-chartjs-2";
import { Card } from "@material-tailwind/react";
import { useQuery } from "react-query";
import axios from "axios";

Chart.register(CategoryScale);
export default function App() {

  const {data: revenueByTypeAndMonth} = useQuery(
    'accepted-dict',
    () => {
      return axios.get('http://localhost:8080/api/management/getAcceptedDictionary')
    }
  )

    return (
        <div>
          {/* {data?.data.length} */}
        <Card className="items-center w-full">
      <div className="w-full flex-row flex justify-center">

        {
          revenueByTypeAndMonth?.data['1'].qty
        }
        {
          
        }
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