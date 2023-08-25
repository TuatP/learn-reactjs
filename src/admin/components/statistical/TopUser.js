import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from "chart.js/auto";


export default function TopUser() {

    const [topUser, setTopUser] = useState('');
    const [chartInstance, setChartInstance] = useState(null);


    useEffect(() => {
        topUserBuy();
    }, [])

    const topUserBuy = async () => {
        try {
            const repose = await axios.get('http://localhost:8080/api/report/user');
            setTopUser(repose.data);

        } catch (error) {
            console.log('error call API: ', error);
        }
    } 

    useEffect(() => {
        if (topUser.length > 0) {
          const labels = topUser.map((item) => item[0].username);
          const data = topUser.map((item) => item[1]);
          console.log(topUser);
          console.log("lables:", labels);
          console.log("data:", data);
          const ctx = document.getElementById("myChartUser").getContext("2d");
          if (chartInstance) {
            chartInstance.destroy();
          }
          const newChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "User",
                  data: data,
                  backgroundColor: ["#ee8585", "#303ebd", "#75bb3c"],
                  borderColor: ["rgba(80, 192, 192, 1)", "#78ff63"],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: "Top Selling Users Chart",
            },
            legend: {
              display: true,
              position: "top",
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [topUser]);

  return (
    <div>
         <div className="row" style={{marginLeft: '400px'}}>
        <div className="col-6">
          <canvas id="myChartUser" width="400" height="400" />
        </div>
      </div>
    </div>
  )
}
