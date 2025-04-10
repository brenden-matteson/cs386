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

const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx,{
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            label: 'Expenses Dataset',
            data: [],
            backgroundColor: [
                'rgb(54, 69, 79)',
                'rgb(79, 99, 111)',
                'rgb(105, 130, 145)',
                'rgb(132, 163, 181)',
                'rrgb(160, 197, 217)',
                'rgb(189, 232, 255)'
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

const typeOfIncome = document.getElementById("typeOfIncome");

typeOfIncome.addEventListener("change", function() {
    
    $('.hourlySection').css('display','none');
    $('.salarySection').css('display','none');
    $('.contractSection').css('display','none');

    if(typeOfIncome.value == "hourly") {
        $('.hourlySection').css('display', 'block');
    }
    else if(typeOfIncome.value == "salary") {
        $('.salarySection').css('display','block');
    }
    else if(typeOfIncome.value == "contract") {
        $('.contractSection').css('display','block');
    }
});

const addContractButton = document.getElementById("addContract");

let contracts = [];

addContractButton.addEventListener("click", function() {
    let contractPayout = document.getElementById("contractPayout");
    let contractsText = document.getElementById("contractsText");

    if(contractPayout.value != 0) {
        contracts.push(Number(contractPayout.value));
        contractPayout.value = '';
        contractsText.innerHTML = "Contracts: " + contracts.toString();
    }
});

const removeContractButton = document.getElementById("removeContract");

removeContractButton.addEventListener("click", function() {
    if(contracts.length != 0) {
        contracts.pop();
        contractsText.innerHTML = "Contracts: " + contracts.toString();
    }
});

//This function runs after the calculate button is clicked
$('#calculateBtn').click(function () {

    // get income values
    let hourlyIncome = new hourly($("#payRate").val(),$("#workHours").val());
    let salaryIncome = new salary($("#yearlySalary").val());
    let contractIncome = new contract(contracts);

    // get monthly expenses
    let expenseObjects = document.getElementsByClassName("monthly");

    let monthlyExpenses = new monthly(expenseObjects);

    // get semi-annual expenses
    expenseObjects = document.getElementsByClassName("semi-annually")

    let semiAnnualExpenses = new semiAnnually(expenseObjects);

    // get annual expenses
    expenseObjects = document.getElementsByClassName("annually")

    let annualExpenses = new annually(expenseObjects);

    //This will call the totalPay function
    let estimatedPay = hourlyIncome.totalPay() + salaryIncome.totalPay() + contractIncome.totalPay();
    
    // combine all expenses
    let estimatedExpensesList = [...monthlyExpenses.expenses, ...semiAnnualExpenses.expenses, ...annualExpenses.expenses];

    // combine all labels
    let expensesLabels = [...monthlyExpenses.labels, ...semiAnnualExpenses.labels, ...annualExpenses.labels];

    // get total expenses
    let estimatedExpenses = monthlyExpenses.totalAnnualExpenses + semiAnnualExpenses.totalAnnualExpenses + annualExpenses.totalAnnualExpenses;
    
    //this is how much you should have left over after expenses
    let remainingBalance = Number((estimatedPay - estimatedExpenses).toFixed(2));
    
    //This changes the current text in payResult
    $("#payResult").text(estimatedPay);
    
    //This changes the current text in expenseResult
    $("#expenseResult").text(estimatedExpenses);
    
    //This changes the current text in balanceResult
    $("#balanceResult").text(remainingBalance);

    updateChart(expensesLabels, estimatedExpensesList);
});

function updateChart(expensesLabels, estimatedExpensesList) {
    myChart.data.labels = expensesLabels;
    myChart.data.datasets[0].data = estimatedExpensesList;
    myChart.update(); // Refresh the chart with new data
}