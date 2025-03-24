//variables used for nav-button loop
var buttons = document.getElementsByClassName("nav-button");
var i;

//get all buttons named nav-content, attaches event listener and toggles padding bottom and maxheight properties to make it appear and disappear
for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = document.getElementById("nav-content");
        if (content.style.maxHeight){
            content.style.maxHeight = null;
            content.style.paddingBottom = "0px";
        } else {
            content.style.maxHeight = content.scrollHeight + "px"
            content.style.paddingBottom = "15px";
        } 
    });
}

console.log(window.innerWidth);

window.addEventListener("scroll", function() {
    let logo = document.getElementById("header-logo");
    let nav = document.getElementById("nav-button");
    if (window.innerWidth > 600) {
        if (window.scrollY > 50) { 
            logo.style.height = "80px";
            logo.style.paddingLeft = "10px";
            logo.style.paddingRight = "10px";
            nav.style.paddingLeft = "10px";
            nav.style.paddingRight = "10px";
        } else {
            logo.style.height = "120px";
            logo.style.paddingLeft = "50px";
            logo.style.paddingRight = "50px";
            nav.style.paddingLeft = "50px";
            nav.style.paddingRight = "50px";
        }
    }
});


//Functions for calculations of salary, expenses, and estimated balance

//Create objects variables arrays and change as such for specificatios
let workHours = 0;
let payRate = 0;
let estPay = 0;
let newExpenses = {
    Groceries: 0,
    Rent: 0,
    Util: 0,
    Clothing: 0,
    Entertainment: 0,
    Food: 0
};

const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx,{
    type: 'doughnut',
    data: {
        labels: [
            'Groceries',
            'Rent',
            'Utilities',
            'Clothing',
            'Entertainment',
            'Food'
        ],
        datasets: [{
            label: 'Expenses Dataset',
            data: [
                newExpenses.Groceries, 
                newExpenses.Rent, 
                newExpenses.Util, 
                newExpenses.Clothing, 
                newExpenses.Entertainment, 
                newExpenses.Food
            ],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(11, 243, 108)',
                'rgb(214, 58, 167)',
                'rgb(128, 51, 230)'
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


//Basic function that calculates total projected pay for the year
function totalPay( workHours, payRate){
    if( workHours <= 0 || payRate <= 0 ){
        alert("No pay can be estimated");
        return;
    }
    else{
        estPay = workHours * payRate * 52;
        return estPay;
    }

}

//function that calculates the total projected expendetures for the month
function totalCost( newExpenses ){
    let sumCost = 0;
    for (let key in newExpenses) {
        if (newExpenses.hasOwnProperty(key)) {
            sumCost += newExpenses[key];
        }
    }
    return sumCost;
};

//This function runs after the calculate button is clicked
$('#calculateBtn').click(function () {
    //takes in the values input by the user
    let workHours = $("#workHours").val();
    let payRate = $("#payRate").val();
    //takes in the values input by the user
    let expenses = {
        Groceries: parseFloat($("#groceries").val()),
        Rent: parseFloat($("#rent").val()),
        Util: parseFloat($("#util").val()),
        Clothing: parseFloat($("#clothing").val()),
        Entertainment: parseFloat($("#entertainment").val()),
        Food: parseFloat($("#food").val())
    };
    
    newExpenses = expenses;

    //This will call the totalPay function
    let estimatedPay = totalPay(workHours, payRate);
    //this will call the total Cost function and multiply it by 12 since it estimates
    //the cost for the month this will result in estimated costs for the year
    let estimatedExpenses = totalCost(expenses) *12;
    //this is how much you should have left over after expenses
    let remainingBalance = estimatedPay - estimatedExpenses;
    //This changes the current text in payResult
    $("#payResult").text(estimatedPay);
    //This changes the current text in expenseResult
    $("#expenseResult").text(estimatedExpenses);
    //This changes the current text in balanceResult
    $("#balanceResult").text(remainingBalance);

    updateChart(newExpenses);
});

function updateChart(newExpenses) {
    myChart.data.datasets[0].data = [
        newExpenses.Groceries,
        newExpenses.Rent,
        newExpenses.Util,
        newExpenses.Clothing,
        newExpenses.Entertainment,
        newExpenses.Food
    ];

    myChart.update(); // Refresh the chart with new data
}
    
