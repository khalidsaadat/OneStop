// App.js
import { useState } from "react";
import { Button } from "@material-tailwind/react";

const AvailableTimeslots = ({date, vehicleType}) => {
    const [timeslot, setTimeslot] = useState({
        
      });

      function getDateStringFormat(thedate) {
        let newDate = new Date(thedate);
        let day = newDate.getDate()+1;
        let month = newDate.toLocaleString('default', { month: 'long' });
        let year = newDate.getFullYear();
        let dateString = month + " " + day + ", " + year;
        return dateString;
      }

      function getTimeslots() {
        let date = {date};
        let vehicleType = {vehicleType};
        //call api
    }
 
  return (
    <div className="AvailableTimeslots">
      Listing availabilities for {vehicleType} Vehicles on { getDateStringFormat({date}.date) }
    </div>
  );
}

export default AvailableTimeslots