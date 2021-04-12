import { Bar } from 'react-chartjs-2';


const BarChart = ( props ) => {

    const names = props.explanationArray;
    const explanationLabels = props.explanationLabels;
    const explanationValues = props.explanationValues;
    

    return (
        <div>
            <Bar
                data={{
                    labels: explanationLabels,
                    datasets: [{
                        data: explanationValues,
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ]
                    }]
                }}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                            label: function(item, data){
                                return names[item.index];
                            },
                            title: function(item, data){
                                return;
                            }
                        },
                        displayColors: false
                    }
                }}
            />
        </div>
    );
}
 
export default BarChart;