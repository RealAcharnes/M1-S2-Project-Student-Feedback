import { Doughnut } from 'react-chartjs-2';


const DoughnutChart = ({ labels, answerValues }) => {

    return ( 
        <div>
            <Doughnut
                data={{
                    labels: labels,
                    datasets: [{
                        data: answerValues,
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                        ]
                    }]
                }}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
     );
}

export default DoughnutChart;