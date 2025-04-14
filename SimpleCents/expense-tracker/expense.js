class expense {
    constructor() {
        this.totalAnnualExpenses = 0;
        this.expenses = [];
        this.labels = [];
    }

    totalCost() {
        return Number(this.totalAnnualExpenses);
    }

    monthlyCost() {
        return Number(Number(this.totalAnnualExpenses)/12);
    }
}

class monthly extends expense {
    constructor(expenseList) {
        let costSum = 0;
        let expenses = [];
        let labels = [];

        if(expenseList.length == 0)
        {
            return 0;
        }

        for (let i = 0; i < expenseList.length; i++) {
            if((parseFloat(expenseList[i].value) != 0) && (parseFloat(expenseList[i].value.length) != 0)) {
                labels.push(expenseList[i].name);
                expenses.push(parseFloat(expenseList[i].value)*12);
                costSum += (parseFloat(expenseList[i].value)*12);
            }
        }

        super()
        this.labels = labels;
        this.expenses = expenses;
        this.totalAnnualExpenses = costSum;
    }
}

class semiAnnually extends expense {
    constructor(expenseList) {
        let costSum = 0;
        let expenses = [];
        let labels = [];

        if(expenseList.length == 0)
        {
            return 0;
        }

        for (let i = 0; i < expenseList.length; i++) {
            if((parseFloat(expenseList[i].value) != 0) && (parseFloat(expenseList[i].value.length) != 0)) {
                labels.push(expenseList[i].name);
                expenses.push(parseFloat(expenseList[i].value)*2);
                costSum += (parseFloat(expenseList[i].value)*2);
            }
        }

        super()
        this.labels = labels;
        this.expenses = expenses;
        this.totalAnnualExpenses = costSum;
    }
}

class annually extends expense {
    constructor(expenseList) {
        let costSum = 0;
        let expenses = [];
        let labels = [];

        if(expenseList.length == 0)
        {
            return 0;
        }

        for (let i = 0; i < expenseList.length; i++) {
            if((parseFloat(expenseList[i].value) != 0) && (parseFloat(expenseList[i].value.length) != 0)) {
                labels.push(expenseList[i].name);
                expenses.push(parseFloat(expenseList[i].value));
                costSum += (parseFloat(expenseList[i].value));
            }
        }

        super()
        this.labels = labels;
        this.expenses = expenses;
        this.totalAnnualExpenses = costSum;
    }
}