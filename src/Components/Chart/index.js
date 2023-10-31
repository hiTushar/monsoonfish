import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './index.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

// config options for the charts
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    }
};

// Label and options for chart one
const labelsOne = ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
const dataOne = {
    labels: labelsOne,
    datasets: [
        {
            fill: true,
            label: 'Model Capacity',
            data: [0, 28000, 12000, 10000, 34000, 21000, 24000, 19000, 20000, 18000, 6900],
            borderColor: 'rgb(255 42 63)',
            backgroundColor: 'rgb(255, 42, 63, 0.2)',
            tension: 0.4 // https://stackoverflow.com/questions/63395038/chart-js-how-to-make-sharp-lines-to-smooth-curved-lines
        },
        {
            fill: true,
            label: 'Peak Date',
            data: [0, 69100, 4000, 3500, 12000, 6910, 7100, 7100, 6900, 8000, 5000],
            borderColor: 'rgb(226 226 226)',
            backgroundColor: 'rgb(226, 226, 226, 0.2)',
            tension: 0.4
        },
        {
            fill: true,
            label: '2016-07-06',
            data: [0, 3500, 6900, 2000, 10000, 6910, 7100, 7100, 6900, 8000, 5000],
            borderColor: 'rgb(141, 188, 208)',
            backgroundColor: 'rgb(141, 188, 208, 0.2)',
            tension: 0.4
        }
    ],
};

// Label and options for chart two
const labelsTwo = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const dataTwo = {
    labels: labelsTwo,
    datasets: [
        {
            fill: false,
            label: 'Dataset 3',
            data: [65, 58, 80, 81, 56, 55, 40],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.1
        },
    ]
}

// ref: https://react-chartjs-2.js.org/examples/area-chart 
export default function ChartComponent(props) {
    return (
        <div className='container'>
            <Line options={options} data={dataOne} />
            <Line options={options} data={dataTwo} />
        </div>
    )
}
