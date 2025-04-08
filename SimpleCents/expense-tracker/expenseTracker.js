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

module.exports = { totalPay, totalCost };