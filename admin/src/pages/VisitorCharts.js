import React, { useEffect } from 'react'
import Header from '../components/Header';
import Sidenav from '../components/Sidenav';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useState } from 'react';

function VisitorCharts() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const [visitorDates, setVisitorDates] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/getVisitorDates")
      .then((response) => {
        console.log(response.data);
        setVisitorDates(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("error!");
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Visitors Line Graph',
      },
    },
  };

  const sortedVisitorDates = visitorDates.sort((a, b) => {
    return new Date(a.vis_date) - new Date(b.vis_date);
  });

  const latestVisitorDates = sortedVisitorDates.slice(0, 7);

  const labels = latestVisitorDates.map((entry) => {
    const date = new Date(entry.vis_date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
  });

  const data = {
    labels: labels, // Reverse the labels to have oldest date on the left
    datasets: [
      {
        label: 'Number of visitors',
        data: latestVisitorDates.map((entry) => entry.date_count),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div>
      <Header />
      <div id='layoutSidenav'>
        <Sidenav />
        <div id="layoutSidenav_content">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  )
}

export default VisitorCharts;