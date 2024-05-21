// LineGraph.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useCovidData } from './covidData';
import 'chart.js/auto';

export const LineGraph: React.FC = () => {
    // Fetching COVID-19 data using a custom hook
    const { data, error, isLoading } = useCovidData();

    // Display a loading message while data is being fetched
    if (isLoading) return <div>Loading...</div>;

    // Display an error message if data fetching fails
    if (error) return <div>Error fetching data</div>;

    // Extract dates and values (cases, deaths, recovered) from the fetched data
    const dates = Object.keys(data.cases);
    const cases = Object.values(data.cases);
    const deaths = Object.values(data.deaths);
    const recovered = Object.values(data.recovered);

    // Chart data configuration
    const chartData = {
        labels: dates,
        datasets: [
            {
                label: 'Cases',
                data: cases,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
            {
                label: 'Deaths',
                data: deaths,
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                fill: true,
            },
            {
                label: 'Recovered',
                data: recovered,
                borderColor: 'rgba(54,162,235,1)',
                backgroundColor: 'rgba(54,162,235,0.2)',
                fill: true,
            },
        ],
    };

    // Chart options configuration
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'COVID-19 Cases Fluctuations Over Time',
            },
        },
    };

    // Render the line chart with the provided data and options
    return <Line data={chartData} options={options} />;
};

