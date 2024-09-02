import { saveLS } from "./storage.js";

let table;
const tbl = document.getElementById("tab-data")
const form = document.getElementById("form");

function renderTblHeading() {
    tbl.innerHTML = "";
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const headingTextArr = ["Day of Week", "Is it a School Day", "Productive Hrs.", "Workout Hrs.", "Hobbies Hrs", "Days Since Last Shower", "Decision", "Actions"];
    headingTextArr.forEach(function(text){
        const th = document.createElement("th"); 
        th.textContent = text;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    return table;
}

function renderTblBtn (obj, index, decision) {
    const td = document.createElement("td");
    const btnEdit = document.createElement("button");
    const btnDel = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnDel.textContent = "Del";
    td.appendChild(btnEdit);
    td.appendChild(btnDel);
    btnDel.addEventListener('click', function(e) {
        decision.splice(index, 1);
        saveLS(decision)
        renderTbl(decision);
    });
    btnEdit.addEventListener("click", function(e) {
        form[1].value = obj.dayOfWeek;
        form[2].value = obj.schoolDay;
        const torf = obj.schoolDay === true;
        form[2].checked = torf;
        form[3].checked = !torf;
        form[4].value = obj.productiveHrs;
        form[5].value = obj.workoutHrs;
        form[6].value = obj.hobbiesHrs;
        form[7].value = obj.daysSinceShower;
        decision.splice(index, 1);
        saveLS(decision)
        renderTbl(decision)
    })
    return td;
}

function renderTblBody(decisions) {  
    const tbody = document.createElement("tbody");
    decisions.forEach((obj, index) => {
        console.log(index);
        const tr = document.createElement("tr"); 
        const keys = ["dayOfWeek", "schoolDay", "productiveHrs", "workoutHrs", "hobbiesHrs", "daysSinceShower", "showerFirst"]
        keys.forEach(key => {
            const td = document.createElement("td");
            td.textContent = obj[key];
            tr.appendChild(td);
        })
        const td = renderTblBtn(obj, index, decisions);
        tr.appendChild(td);
        tbody.appendChild(tr);
    });
    return tbody;
}


function renderTbl(decisions) {
    tbl.innerHTML = "";
    if (decisions.length !== 0) {
        const table = renderTblHeading();
        const tbody = renderTblBody(decisions);
        table.appendChild(tbody);
        tbl.appendChild(table);
    }
}

export {renderTbl};
