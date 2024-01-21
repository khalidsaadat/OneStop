// App.js
import { Button, Select, Option, Card } from "@material-tailwind/react";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import AvailableTimeslots from "../components/AvailableTimeslots";

export default function App() {
    const [value, setValue] = useState({}); 

        const [isDone, setIsDone] = useState(2)

        const [vehicleValue, setVehicleValue] = useState({}); 
        
        const handleValueChange = (newValue) => {
            setIsDone(isDone-1)
            setValue(newValue);
        } 

        // function findAvailableTimes () {
        //     setIsDone(isDone-1)
        // }

        const handleVehicleChange = (newVehicleValue) => {
            setIsDone(isDone-1)
            setVehicleValue(newVehicleValue.toString());
        }
    return (
        <div className="grid triple-grid w-full justify-center pt-20">
            <div className="max-w-sm">
            <Select value={vehicleValue.toString()} onChange={handleVehicleChange} label="Select Vehicle Type" className="max-w-sm" defaultValue={'Select vehicle type'} >
                <Option value="Compact">Compact</Option>
                <Option value="Medium">Medium Size</Option>
                <Option value="Full Size">Full Size</Option>
                <Option value="Class 1 Truck">Class 1 Truck</Option>
                <Option value="Class 2 Truck">Class 2 Truck</Option>
            </Select>
            </div>
            <Datepicker
            containerClassName="max-w-sm relative border border-gray-500 rounded-md"
            useRange={false} 
            value={value}
            asSingle={true}
            startFrom="2022-10-01"
            minDate={new Date("2022-10-01")} 
            maxDate={new Date("2022-12-01")}
            onChange={handleValueChange} 
            /> 
            <div className="max-w-sm">
            {isDone<=0 ? <AvailableTimeslots date={value.startDate} vehicleType={vehicleValue.toString()} /> : <Card className="max-w-ms rounded border">Select a vehicle type and date to see booking availabilities</Card>}
            </div>
        </div>
    );
}