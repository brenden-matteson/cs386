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

//This will add an expense to the sum of Expenses
function addExpense() {
    const expensesDiv = document.getElementById('expenses');
    const row = document.createElement('div');
    row.className = 'expense-row';
      row.innerHTML = `
        <input type="text" placeholder="Name" />
        <input type="number" placeholder="Amount" oninput="calculate()" />
        <button onclick="this.parentElement.remove(); calculate();">Delete</button>
      `;
    expensesDiv.appendChild(row);
}
//This will detect when the calculate button is hit
$('#calculateBtn').click(calculate);

//This function calculates the Salary and what's leftover after the sum of expenses
//is calculated and subtracted
function totalIncome() {
    // get hourly income
    let hourlyIncome = new hourly($("#payRate").val(),$("#workHours").val());

    // get salary income
    let salaryIncome = new salary($("#yearlySalary").val());

    // get contract income
    let contractIncome = new contract(contracts);

    // return total income
    return hourlyIncome.monthlyPay() + salaryIncome.monthlyPay() + contractIncome.monthlyPay();
}

function takeHomePay() {
    // get hourly income
    let hourlyIncome = new hourly($("#payRate").val(),$("#workHours").val());

    // get salary income
    let salaryIncome = new salary($("#yearlySalary").val());

    // get contract income
    let contractIncome = new contract(contracts);

    // return total income
    return (hourlyIncome.takeHomePay() + salaryIncome.takeHomePay() + contractIncome.takeHomePay())/12;
}

function totalExpenses() {
    // get monthly expenses
    let expenseObjects = document.getElementsByClassName("monthly");

    let monthlyExpenses = new monthly(expenseObjects);

    // get semi-annual expenses
    expenseObjects = document.getElementsByClassName("semi-annually")

    let semiAnnualExpenses = new semiAnnually(expenseObjects);

    // get annual expenses
    expenseObjects = document.getElementsByClassName("annually")

    let annualExpenses = new annually(expenseObjects);

    // get total expenses from non additional sources
    let estimatedExpenses = monthlyExpenses.monthlyCost() + semiAnnualExpenses.monthlyCost() + annualExpenses.monthlyCost();

    // get additional expenses
    const amounts = [...document.querySelectorAll("div.expense-row > input[type='number']")];

    // add them together
    const totalExpenses = amounts.reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0) + estimatedExpenses;

    // return total expenses
    return totalExpenses;
}

function remainingBalance(income, expense) {
    return (income - expense)
}

function calculate() {
    // get paragraph elements
    const remainingSummary = document.getElementById('remainingSummary');
    const takeHomeSummary = document.getElementById('takeHomePay');
    const monthlyIncomeSummary = document.getElementById("monthlyIncome");
    
    // get total income
    const income = totalIncome();

    //get take home income
    const takeHome = takeHomePay();

    // get total expenses
    const expenses = totalExpenses();
    
    const remaining = remainingBalance(takeHome, expenses);

    monthlyIncomeSummary.textContent = `Monthly Income: $${income.toFixed(2)}`
    takeHomeSummary.textContent = `Take Home Pay: $${takeHome.toFixed(2)}`;
    remainingSummary.textContent = `Total Expenses: $${expenses.toFixed(2)} | Remaining: $${remaining.toFixed(2)}`;

    calculateSavings();
}

const savingsGoal = document.getElementById("goal");

savingsGoal.addEventListener('input', calculateSavings);

function calculateSavings() {
    const savingsSummary = document.getElementById("savingsSummary")
    const percentageRemaining = remainingBalance(takeHomePay(), totalExpenses())/totalIncome();
    if(savingsGoal.value > 0)
    {
        if(percentageRemaining >= 0.20 && percentageRemaining < 0.40)
            {
                let savingsAmount = 0.20*totalIncome();
                let remaining = remainingBalance(takeHomePay(), totalExpenses()) - savingsAmount;
                let savingsTime = savingsGoal.value/savingsAmount;
                savingsSummary.textContent = `Using the traditional 20% savings rule, you will need to save $${savingsAmount.toFixed(2)} each month for ${Math.ceil(savingsTime)} months to reach your goal. The remaining $${remaining.toFixed(2)} should be used for your entertainment.`;
            }
            else if(percentageRemaining < 0.20 && percentageRemaining > 0.10)
            {
                let savingsAmount = 0.10*totalIncome();
                let remaining = remainingBalance(takeHomePay(), totalExpenses()) - savingsAmount;
                let savingsTime = savingsGoal.value/savingsAmount;
                savingsSummary.textContent = `Using a conservative 10% savings rule, you will need to save $${savingsAmount.toFixed(2)} each month for ${Math.ceil(savingsTime)} months to reach your goal. The remaining $${remaining.toFixed(2)} should be used for your entertainment.`;
            }
            else if(percentageRemaining >= 0.40 )
            {
                let savingsAmount = 0.40*totalIncome();
                let remaining = remainingBalance(takeHomePay(), totalExpenses()) - savingsAmount;
                let savingsTime = savingsGoal.value/savingsAmount;
                savingsSummary.textContent = `Using a whopping 40% savings rule, you can save $${savingsAmount.toFixed(2)} each month for ${Math.ceil(savingsTime)} months to reach your goal. The remaining $${remaining.toFixed(2)} should be used for your entertainment.`;
            }
            else
            {
                let remaining = remainingBalance(takeHomePay(), totalExpenses());
                savingsSummary.textContent = `You are using essentially your entire budget already, you should try to find another source of income, and in the meantime, use the remaining $${remaining.toFixed(2)} for your entertainment.`;
            }
    }

    console.log(remainingBalance(takeHomePay(), totalExpenses())/totalIncome());
}