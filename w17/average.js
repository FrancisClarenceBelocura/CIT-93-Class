import { cfpData } from "./storage.js"

const cfpAvg = () => {
    const avg = cfpData.reduce((sum, entry) => sum + entry.total, 0)/cfpData.length
    const roundedAvg = avg.toFixed(2)
    return roundedAvg;
}

export { cfpAvg }