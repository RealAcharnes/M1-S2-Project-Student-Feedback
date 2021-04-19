
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
                            label: (item, datax) => {
                                let string = ""
                                switch(data[item.index]){
                                    case 4:
                                        string = "Oui"
                                        break
                                    case 3:
                                        string = "Plutot Oui"
                                        break
                                    case 2: 
                                        string = "Plutot Non"
                                        break
                                    default:
                                        string = "Non"
                                        break
                                }
                                return string
                            }
                        }
                    }
                }}
            />
        </div>
     );
}
 
export default LineChart;
