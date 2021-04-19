
import { Line } from 'react-chartjs-2';


const LineChart = ({ labels, data }) => {
    return ( 
        <div>
            <Line
                data={{
                    labels: labels,
                    datasets: [{
                        data: data,
                        borderColor: 'rgba(75, 192, 192, 0.6)'
                    }]
                }}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: (item, data) => {
                                return 
                            }
                        }
                    }
                }}
            />
        </div>
     );
}
 
export default LineChart;
