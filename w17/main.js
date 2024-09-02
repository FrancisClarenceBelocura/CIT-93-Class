import { renderTbl } from "./render.js";
import { determineHomeSizePts, determineHouseHoldPts } from "./cfp.js";
import { FORM, FNAME, LNAME, SUBMIT, WATERCONSUM, CHECKBOX } from "./global.js";
import { saveLS, cfpData } from "./storage.js"; 
import { FP } from "./fp.js";

console.log("global scope");

const validateField = event => {
    const field = event.target.value;
    const fieldId = event.target.id;
    const fieldError = document.getElementById(`${fieldId}Error`);

    if (field === '') {
        fieldError.textContent = `${fieldId} is required`;
        event.target.classList.add('invalid');
    } else {
        fieldError.textContent = '';
        event.target.classList.remove('invalid');
    }
};

FNAME.addEventListener('blur', validateField);
LNAME.addEventListener('blur', validateField);

const determineRecycleItems = e => {
    const numberChecked = document.querySelectorAll('.recycle:checked').length;
    return {
        glass: e.target.glass.checked,
        plastic: e.target.plastic.checked,
        paper: e.target.paper.checked,
        aluminum: e.target.aluminum.checked,
        steel: e.target.steel.checked,
        food: e.target.food.checked,
        recyclePoints: (24 - (numberChecked * 4))
    }
}

function btnFunction() {
    if (WATERCONSUM.value === "0") {
        CHECKBOX.disabled = true;
    }
    else {
        CHECKBOX.disabled = false;
    }
}

WATERCONSUM.addEventListener('change', btnFunction)

function doubleCalc() {
    if (CHECKBOX.checked) {
        return parseInt(WATERCONSUM.value * 2);
    }
    return parseInt(WATERCONSUM.value);
}

document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    if (FNAME.value !== '' && LNAME.value !== '') {
        SUBMIT.textContent = '';
        const doubledWater = doubleCalc();
        const fpObj = new FP(FNAME.value, LNAME.value, parseInt(e.target.numberofpeople.value), e.target.typeofhome.value, e.target.foodconsumption.value, e.target.foodconvenience.value, doubledWater, parseInt(e.target.householdp.value), CHECKBOX.checked, parseInt(e.target.wasteproduced.value), determineRecycleItems(e), parseInt(e.target.pvu.value), parseInt(e.target.pt.value), parseInt(e.target.f.value))
        cfpData.push(fpObj);
        saveLS(cfpData);
        renderTbl(cfpData);
        FORM.reset();
    }
    else {
        SUBMIT.textContent = "Form requires first name and last name"
    }
})

renderTbl(cfpData);
