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

        if (hourlyPay == null || hoursPerWeek == null || isNaN(hourlyPay) || isNaN(hoursPerWeek)) {
            alert("No pay can be estimated");
            return; // Exit the constructor early
        }

        super();
        this.hourlyPay = hourlyPay;
        this.hoursPerWeek = hoursPerWeek;
        this.totalAnnualIncome = Number((this.hourlyPay * this.hoursPerWeek * 52).toFixed(2));
    }
}

class salary extends income {
    constructor(yearlyIncome) { 
        if (yearlyIncome == null || isNaN(yearlyIncome)) {
            alert("No pay can be estimated");
            return; // Exit the constructor early
        }

        super();
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