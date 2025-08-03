import { renderTbl } from "./render.js";
import { saveLS, decisions } from "./storage.js"; 
import { PRIORITIES } from "./class.js"; 

const form = document.getElementById("form");

const validateField = event => {
    const field = event.target.value;
    const fieldError = document.getElementById('dayOfWeekError');
    if (field !== 'Monday' && field !== 'Tuesday' && field !== 'Wednesday' && field !== 'Thursday' && field !== 'Friday' && field !== 'Saturday' && field !== 'Sunday') {
        fieldError.textContent = 'An actual day is required';
        event.target.classList.add('invalid');
    } else {
        fieldError.textContent = '';
        event.target.classList.remove('invalid');
    }
};

document.getElementById("dayOfWeek").addEventListener('blur', validateField);

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const dayOfWeek = document.getElementById("dayOfWeek")
    const submiterror = document.getElementById("submiterror")
    if (dayOfWeek.value !== 'Monday' && dayOfWeek.value !== 'Tuesday' && dayOfWeek.value !== 'Wednesday' && dayOfWeek.value !== 'Thursday' && dayOfWeek.value !== 'Friday' && dayOfWeek.value !== 'Saturday' && dayOfWeek.value !== 'Sunday') {
        submiterror.textContent = "You need to enter an actual day of the week"
        setTimeout(() => {
            submiterror.textContent = ''
        }, 3000)
    }
    else {
        const priorities = new PRIORITIES(dayOfWeek.value, form.querySelector('input[id="true"]:checked') ? true : false, parseFloat(form.productiveHrs.value), parseFloat(form.workoutHrs.value), parseFloat(form.hobbiesHrs.value), parseFloat(form.daysSinceShower.value));
        decisions.push(priorities)
        saveLS(decisions);
        renderTbl(decisions);
        form.reset();
    }
});

renderTbl(decisions)

