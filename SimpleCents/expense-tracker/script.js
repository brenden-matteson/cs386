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
        console.log(contracts);
        contractsText.innerHTML = "Contracts: " + contracts.toString();
    }
});

const removeContractButton = document.getElementById("removeContract");

removeContractButton.addEventListener("click", function() {
    if(contracts.length != 0) {
        contracts.pop();
        console.log(contracts);
        contractsText.innerHTML = "Contracts: " + contracts.toString();
    }
});

//This function runs after the calculate button is clicked
$('#calculateBtn').click(function () {
    //takes in the values input by the user

    let user = new income();

    if(typeOfIncome.value == "hourly") {
        user = new hourly($("#payRate").val(),$("#workHours").val());
    }
    else if(typeOfIncome.value == "salary") {
        user = new salary($("#yearlySalary").val());
    }
    else if(typeOfIncome.value == "contract") {
        user = new contract(contracts);
    }

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
    let estimatedPay = user.totalPay();
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

class income {
    constructor() {
        this.totalAnnualIncome = 0;
    }

    totalPay() {
        return this.totalAnnualIncome;
    }
}

class hourly extends income {
    constructor(hourlyPay, hoursPerWeek) {

        if (hourlyPay == null || hoursPerWeek == null || isNaN(hourlyPay) || isNaN(hoursPerWeek) || hourlyPay == 0 || hoursPerWeek == 0) {
            alert("No pay can be estimated");
            return; // Exit the constructor early
        }

        super();
        this.hourlyPay = hourlyPay;
        this.hoursPerWeek = hoursPerWeek;
        this.totalAnnualIncome = this.hourlyPay * this.hoursPerWeek * 52;
    }
}

class salary extends income {
    constructor(yearlyIncome) { 
        if (yearlyIncome == null || isNaN(yearlyIncome) || yearlyIncome == 0) {
            alert("No pay can be estimated");
            return; // Exit the constructor early
        }

        super();
        this.yearlyIncome = yearlyIncome;
        this.weeklyIncome = this.yearlyIncome / 52;
        this.biweeklyIncome = this.yearlyIncome / 26;
        this.totalAnnualIncome = this.yearlyIncome;
    }
}

class contract extends income {
    constructor(contracts = []) {
        if (contracts.length == 0) {
            alert("No pay can be estimated");
            return; // Exit the constructor early
        }

        super();
        this.contracts = contracts;
        this.contractPayout = this.contracts.reduce((acc, val) => acc + val, 0);
        this.totalAnnualIncome = this.contractPayout;
    }
}