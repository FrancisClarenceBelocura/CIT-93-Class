const saveLS = decisions => {
    const serializedArr = JSON.stringify(decisions);
    localStorage.setItem("priority", serializedArr);
}

const getLS = () => {
    const retrievedArr = localStorage.getItem("priority");
    if (retrievedArr !== null) {
        return JSON.parse(retrievedArr);
    }
    else {
        return [];
    }
}

const decisions = getLS();

export {decisions, saveLS, getLS};