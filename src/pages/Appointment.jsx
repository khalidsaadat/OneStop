// App.js
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2"
import revenueData from "./data/revenueData";
import sourceData from "./data/sourceData.json";
import BarChart from "../components/BarChart";
import { PolarArea } from "react-chartjs-2";
import { Card, Select, Option } from "@material-tailwind/react";

Chart.register(CategoryScale);
export default function App() {

    return (
        <Card>
            <Select label="Select Vehicle Type">
            <Option>Compact</Option>
            <Option>Medium</Option>
            <Option>Fullsize</Option>
            <Option>Type 1 Truck</Option>
            <Option>Type 2 Truck</Option>
      </Select>


        </Card>
    );
}