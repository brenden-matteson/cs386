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

    if(contractPayout.value > 0) {
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

    let totalAnnualIncome = hourlyIncome.totalPay() + salaryIncome.totalPay() + contractIncome.totalPay();

    let estimatedPay = hourlyIncome.takeHomePay() + salaryIncome.takeHomePay() + contractIncome.takeHomePay();
    
    // combine all expenses
    let estimatedExpensesList = [...monthlyExpenses.expenses, ...semiAnnualExpenses.expenses, ...annualExpenses.expenses];

    // combine all labels
    let expensesLabels = [...monthlyExpenses.labels, ...semiAnnualExpenses.labels, ...annualExpenses.labels];

    // get total expenses
    let estimatedExpenses = monthlyExpenses.totalAnnualExpenses + semiAnnualExpenses.totalAnnualExpenses + annualExpenses.totalAnnualExpenses;
    
    //this is how much you should have left over after expenses
    let remainingBalance = Number((estimatedPay - estimatedExpenses).toFixed(2));

    //This changes the current text in totalIncomeResult
    $("#totalIncomeResult").text((totalAnnualIncome).toFixed(2));
    
    //This changes the current text in payResult
    $("#payResult").text((estimatedPay).toFixed(2));
    
    //This changes the current text in expenseResult
    $("#expenseResult").text((estimatedExpenses).toFixed(2));
    
    //This changes the current text in balanceResult
    $("#balanceResult").text((remainingBalance).toFixed(2));
    
    let estimatedMonthlyIncome = hourlyIncome.monthlyPay() + salaryIncome.monthlyPay() + contractIncome.monthlyPay();

    let estimatedMonthlyPay = Number((estimatedPay/12).toFixed(2));

    let estimatedMonthlyExpenses = monthlyExpenses.monthlyCost() + semiAnnualExpenses.monthlyCost() + annualExpenses.monthlyCost();

    let remainingMonthlyBalance = Number((estimatedMonthlyPay - estimatedMonthlyExpenses).toFixed(2));

    //This changes the current text in totalIncomeResult
    $("#totalIncomeResultMonthly").text((estimatedMonthlyIncome).toFixed(2));
    
    //This changes the current text in payResult
    $("#payResultMonthly").text((estimatedMonthlyPay).toFixed(2));
    
    //This changes the current text in expenseResult
    $("#expenseResultMonthly").text((estimatedMonthlyExpenses).toFixed(2));
    
    //This changes the current text in balanceResult
    $("#balanceResultMonthly").text((remainingMonthlyBalance).toFixed(2));

    updateChart(expensesLabels, estimatedExpensesList);
});

const utilities = document.getElementsByClassName("util-category");

for (i = 0; i < utilities.length; i++) {
    utilities[i].addEventListener("input", function() {
        const utilInput = document.getElementById("util");
        let sum = 0;

        for (i = 0; i < utilities.length; i++) {
            sum += Number(utilities[i].value);
        }

        utilInput.value = (Number(sum)).toFixed(2);
        utilInput.textContent = (Number(sum)).toFixed(2);
    });
}