import { FORM, TBL } from "./global.js";
import { saveLS } from "./storage.js";
import { cfpAvg } from "./average.js";
import { CHECKBOX } from "./global.js";

let table;

const renderTblHeading = () => {
    TBL.innerHTML = "";
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const headingTextArr = ["First", "Last", "Footprint Total", "Actions"];
    headingTextArr.forEach(text => {
        const th = document.createElement("th"); 
        th.textContent = text;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    return table;
}

const onUpdate = (index, data) => {
    data.splice(index, 1);
    saveLS(data);
    renderTbl(data);
}

const renderTblBtn = (...x) => {
    const td = document.createElement("td");
    const btnEdit = document.createElement("button");
    const btnDel = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnDel.textContent = "Del";
    td.appendChild(btnEdit);
    td.appendChild(btnDel);
    btnDel.addEventListener('click', e => {
        onUpdate(x[1], x[2]);
    });
    btnEdit.addEventListener("click", e =>{
        FORM[1].value = x[0].first;
        FORM[2].value = x[0].last;
        FORM[3].value = x[0].houseMembers;
        FORM[4].value = x[0].houseSize;
        FORM[5].value = x[0].dietType;
        FORM[6].value = x[0].dietConvenience;
        let finalWaterValue = x[0].waterConsumption;
        if (x[0].checked === true) {
            finalWaterValue /= 2;
            FORM[8].checked = true;
        }
        FORM[7].value = finalWaterValue.toString(); 
        FORM[9].value = x[0].houseHoldPur.toString();
        FORM[10].value = x[0].wasteProduced.toString();
        FORM.glass.checked = x[0].recycle.glass;
        FORM.plastic.checked = x[0].recycle.plastic;
        FORM.steel.checked = x[0].recycle.steel;        
        FORM.paper.checked = x[0].recycle.paper;
        FORM.food.checked = x[0].recycle.food;
        FORM.aluminum.checked = x[0].recycle.aluminum;
        FORM.pvu.value = x[0].personalVehicle.toString();
        FORM.pt.value = x[0].publicTransportation.toString();
        FORM.f.value = x[0].flights.toString();
        onUpdate(x[1], x[2]);
    })
    return td;
}

const renderTblBody = (data) => {
    const tbody = document.createElement("tbody");
    data.forEach((obj, index) => {
        console.log(index);
        const tr = document.createElement("tr"); 
        const keys = ["first", "last", "total"]
            keys.forEach(key => {
                const td = document.createElement("td"); 
                td.textContent = obj[key];
                tr.appendChild(td);
            })
        const td = renderTblBtn(obj, index, data);
        tr.appendChild(td);
        tbody.appendChild(tr);
    });
    return tbody;
}

const renderTbl = data => {
    TBL.innerHTML = "";
    if (data.length !== 0) {
        const table = renderTblHeading();
        const tbody = renderTblBody(data);
        table.appendChild(tbody);
        TBL.appendChild(table);
        addRow("tbody");
    }
}

const addRow = () => {
    let tableRef = TBL.querySelector("table");
    let newTR = tableRef.insertRow(-1);
    let newTD = newTR.insertCell(0);
    let newTD_1 = newTR.insertCell(0);
    let newTD_2 = newTR.insertCell(0);
    let newTD_3 = newTR.insertCell(0);
    let newLabel = document.createTextNode(`Average Footprint `)
    let newText = document.createTextNode(cfpAvg());
    newTD_2.appendChild(newLabel);
    newTD_1.appendChild(newText)
  };

export {renderTbl};

