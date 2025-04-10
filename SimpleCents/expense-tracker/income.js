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
        this.totalAnnualIncome = Number((this.hourlyPay * this.hoursPerWeek * 52).toFixed(2));
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