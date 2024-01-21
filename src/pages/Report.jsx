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

  const { data: revenueByTypeAndMonth } = useQuery(
    'accepted-dict',
    () => axios.get('http://localhost:8080/api/management/getAcceptedDictionary'),
    {
      select: response => response.data, // To directly access the data object in the response
    }
  );

  const { data: lostRevenueByTypeAndMonth } = useQuery(
    'denied-dict',
    () => axios.get('http://localhost:8080/api/management/getDeniedDictionary'),
    {
      select: response => response.data, // To directly access the data object in the response
    }
  );

  return (
    <div>
      {/* {data?.data.length} */}
      <Card className="items-center w-full">
        <div className="w-full flex-row flex justify-center">

          {/* {
          revenueByTypeAndMonth&&Object.keys(revenueByTypeAndMonth).map(key => {
            const item = revenueByTypeAndMonth[key];
            return (
              <div key={key}>
                <h3>Key: {key}</h3>
                <p>Quantity: {item.qty}</p>
                <p>Month: {item.month}</p>
                <p>Revenue: {item.revenue}</p>
                <p>Label: {item.label}</p>
              </div>
            );
          })} */}


          <Card className="max-w-sm">
            <PolarArea
              data={{
                labels: revenueByTypeAndMonth&&Object.keys(revenueByTypeAndMonth).map((data) => revenueByTypeAndMonth[data].label),
                datasets: [
                  {
                    label: 'Revenue',
                    data: revenueByTypeAndMonth&&Object.keys(revenueByTypeAndMonth).map((data) => revenueByTypeAndMonth[data].revenue),
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
                labels: revenueByTypeAndMonth&&Object.keys(revenueByTypeAndMonth).map((data) => revenueByTypeAndMonth[data].label),
                datasets: [
                  {
                    label: 'Quantity(Revenue)',
                    data: revenueByTypeAndMonth&&Object.keys(revenueByTypeAndMonth).map((data) => revenueByTypeAndMonth[data].qty),
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
                labels: lostRevenueByTypeAndMonth&&Object.keys(lostRevenueByTypeAndMonth).map((data) => lostRevenueByTypeAndMonth[data].label),
                datasets: [
                  {
                    label: "Revenue Lost",
                    data: lostRevenueByTypeAndMonth&&Object.keys(lostRevenueByTypeAndMonth).map((data) => lostRevenueByTypeAndMonth[data].loss),
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
                labels: lostRevenueByTypeAndMonth&&Object.keys(lostRevenueByTypeAndMonth).map((data) => lostRevenueByTypeAndMonth[data].label),
                datasets: [
                  {
                    label: "Quantity(Revenue Lost)",
                    data: lostRevenueByTypeAndMonth&&Object.keys(lostRevenueByTypeAndMonth).map((data) => lostRevenueByTypeAndMonth[data].qty),
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