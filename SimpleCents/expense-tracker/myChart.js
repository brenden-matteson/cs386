const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx,{
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            label: 'Expenses Dataset',
            data: [],
            backgroundColor: [
                'rgb(169, 184, 138)',
                'rgb(76, 107, 60)',
                'rgb(136, 176, 75)',
                'rgb(127, 155, 125)',
                'rgb(76, 92, 67)',
                'rgb(165, 180, 68)'
            ],
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
                    }
                }
            }
        }
    }
});


function updateChart(expensesLabels, estimatedExpensesList) {
    myChart.data.labels = expensesLabels;
    myChart.data.datasets[0].data = estimatedExpensesList;
    document.getElementById("myChart").style.display = "block";
    myChart.update(); // Refresh the chart with new data
}
