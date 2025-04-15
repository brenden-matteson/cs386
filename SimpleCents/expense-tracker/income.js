class income {
    constructor() {
        this.totalAnnualIncome = 0;
    }

    totalPay() {
        return Number(this.totalAnnualIncome);
    }

    takeHomePay() {
        let totalIncome = this.totalPay();

        if(totalIncome <= 11600)
        {
            return totalIncome*0.90;
        }
        else if(totalIncome > 11600 && totalIncome <= 47150)
        {
            return totalIncome*0.88;
        }
        else if(totalIncome > 47150 && totalIncome <= 100525)
        {
            return totalIncome*0.78;
        }
        else if(totalIncome > 100525 && totalIncome <= 191950)
        {
            return totalIncome*0.76;
        }
        else if(totalIncome > 191950 && totalIncome <= 243725)
        {
            return totalIncome*0.68;
        }
    }

    monthlyPay() {
        return Number((Number(this.totalAnnualIncome)/12).toFixed(2));
    }
}

class hourly extends income {
    constructor(hourlyPay, hoursPerWeek) {
        super();

        try {
            if (hourlyPay == null || hoursPerWeek == null) {
                throw "empty";
            }
            if (isNaN(hourlyPay) || isNaN(hoursPerWeek)) {
                throw "not a number";
            }
        }
        catch(err) {
            this.totalAnnualIncome = 0;
            return;
        }
        
        this.hourlyPay = hourlyPay;
        this.hoursPerWeek = hoursPerWeek;
        this.totalAnnualIncome = Number((this.hourlyPay * this.hoursPerWeek * 52).toFixed(2));
    }
}

class salary extends income {
    constructor(yearlyIncome) { 
        super();

        try { 
            if (yearlyIncome == null) {
                throw "empty";
            }

            if (isNaN(yearlyIncome)) {
                throw "not a number";
            }
        }
        catch(err)
        {
            this.totalAnnualIncome = 0;
            return;
        }

        this.yearlyIncome = yearlyIncome;
        this.totalAnnualIncome = this.yearlyIncome;
    }
}

class contract extends income {
    constructor(contracts = []) {
        super();
        this.contracts = contracts;
        this.contractPayout = this.contracts.reduce((acc, val) => acc + val, 0);
        this.totalAnnualIncome = this.contractPayout;
    }
}

if (typeof module === 'object') {
    module.exports = { hourly, salary, contract, income };
}