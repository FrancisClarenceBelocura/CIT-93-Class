export {determineHomeSizePts, determineHouseHoldPts};

const determineHomeSizePts = (homeSize = "apartment") => {
    let impactScore = 0;
    if (homeSize === "large") {
        impactScore += 10;
    } else if (homeSize === "medium") {
        impactScore += 7;
    } else if (homeSize === "small") {
        impactScore += 4;
    } else if (homeSize === "apartment") {
        impactScore += 2;
    }
    return impactScore;
}


const determineHouseHoldPts = (numberInHousehold = 1) => {
    let houseHoldPoints = 0;
    if (numberInHousehold === 1) {
        houseHoldPoints = 14;
    } else if (numberInHousehold === 2) {
        houseHoldPoints = 12;
    } else if (numberInHousehold === 3) {
        houseHoldPoints = 10;
    } else if (numberInHousehold === 4) {
        houseHoldPoints = 8;
    } else if (numberInHousehold === 5) {
        houseHoldPoints = 6;
    } else if (numberInHousehold === 6) {
        houseHoldPoints = 4;
    } else if (numberInHousehold > 6) {
        houseHoldPoints = 2;
    }
    return houseHoldPoints;
}