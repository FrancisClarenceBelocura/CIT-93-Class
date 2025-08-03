class PRIORITIES {
    constructor(dayOfWeek, schoolDay, productiveHrs, workoutHrs, hobbiesHrs, daysSinceShower) {
        this.dayOfWeek = dayOfWeek;
        this.schoolDay = schoolDay;
        this.productiveHrs = productiveHrs;
        this.workoutHrs = workoutHrs;
        this.hobbiesHrs = hobbiesHrs;
        this.daysSinceShower = daysSinceShower;
        this.workoutHrsReq = 1;
        this.showerFirst();
    }
    showerFirst() {
        const currentTime = new Date(); 
        let decision;
        if (this.daysSinceShower > 1 && currentTime.getHours() >= 21) {
            decision = "It's past 9 P.M. and you haven't showered in more than a day. Take a shower!";
        } 
        else {
            if (this.dayOfWeek !== "Friday" && this.dayOfWeek !== "Saturday" && this.dayOfWeek !== "Sunday") {
                decision = this.determineActivityWD(this.schoolDay, this.workoutHrs, this.productiveHrs); 
            }
            else {
                decision = this.determineActivityWE(this.schoolDay, this.hobbiesHrs, this.workoutHrs, this.productiveHrs);
            }
        }
        if (this.dayOfWeek === "Wednesday") {
            decision += " ALSO... don't forget to put the trash out"
        }
        
        if (this.dayOfWeek === "Sunday") {
            decision += " ALSO... don't forget to clean the kitchen, clean your ears, and cut your nails."
        }

        this.showerFirst = decision
    }
    determineActivityWD() {
        let productiveHrsReqWD = 6;
        if (this.schoolDay) {
            productiveHrsReqWD -= 2;
        }
        if (this.productiveHrs < productiveHrsReqWD) {
            return `You need to do something productive (homework/errands/chores/etc.) for ${productiveHrsReqWD - this.productiveHrs} more hour(s).`;
        } 
        else if (this.workoutHrs < this.workoutHrsReq && this.dayOfWeek === "Monday" || this.dayOfWeek === "Wednesday") {
            return `You need to get some blood flowin'. Workout your chest and biceps for ${this.workoutHrsReq - this.workoutHrs} more hour(s). No pain no gain baby!`;
        } 
        else if (this.workoutHrs < this.workoutHrsReq && this.dayOfWeek === "Tuesday" || this.dayOfWeek === "Thursday") {
            return `You need to get some blood flowin'. Workout your back and legs for ${this.workoutHrsReq - this.workoutHrs} more hour(s). No pain no gain baby!`;
        } 
        else {
            return "You can go do whatever...";
        }
    }
    determineActivityWE() {
        let productiveHrsReqtWE = 4;
        let hobbyHrsReq = 3;
        if (this.schoolDay) {
            productiveHrsReqtWE -= 2;
        }
        if (this.productiveHrs < productiveHrsReqtWE) {
            return `You need to do something productive (homework/errands/chores/etc.) for ${productiveHrsReqtWE - this.productiveHrs} more hour(s).`;
        } 
        else if (this.workoutHrs < this.workoutHrsReq) {
            return `You need to get some blood flowin'. Do some cardio for ${this.workoutHrsReq - this.workoutHrs} more hour(s). No pain no gain baby!`;
        }
        else if (this.hobbiesHrs < hobbyHrsReq) {
            return `You need to practice your hobbies for ${hobbyHrsReq - this.hobbiesHrs} more hours.`;
        } 
        else {
            return "You can go do whatever...";
        }
    }
}

export { PRIORITIES }

