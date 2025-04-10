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

//Gets the ID from the HTML 
const expensesDiv = document.getElementById('expenses');
const incomeInput = document.getElementById('income');
const summary = document.getElementById('summary');
//This will add an expense to the sum of Expenses
function addExpense() {
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
incomeInput.addEventListener('input', calculate);
//This function calculates the Salary and what's leftover after the sum of expenses
//is calculated and subtracted
function calculate() {
    const income = parseFloat(incomeInput.value) || 0;
    const amounts = [...document.querySelectorAll('#expenses input[type="number"]')];
    const totalExpenses = amounts.reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0);
    const remaining = income - totalExpenses;
    summary.textContent = `Total Expenses: $${totalExpenses.toFixed(2)} | Remaining: $${remaining.toFixed(2)}`;
}
