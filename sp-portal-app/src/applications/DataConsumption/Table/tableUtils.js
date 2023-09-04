import { round } from "lodash";

export const orderByService = (array, isAscending) => {
    const response = array.sort((a, b) => {
        if (a.ratingGroupDescription < b.ratingGroupDescription) {
            return isAscending ? -1 : 1;
        }
        if (a.ratingGroupDescription > b.ratingGroupDescription) {
            return isAscending ? 1 : -1;
        }
        return 0;
    });
    return response;
}

export const orderByVolume = (array, isAscending) => {
    const response = array.sort((a, b) => {
        if (a.volume.value < b.volume.value) {
            return isAscending ? -1 : 1;
        }
        if (a.volume.value > b.volume.value) {
            return isAscending ? 1 : -1;
        }
        return 0;
    });
    return response;
}

export const orderByCost = (array, isAscending) => {
    const response = array.sort((a, b) => {
        if (a.cost.value < b.cost.value) {
            return isAscending ? -1 : 1;
        }
        if (a.cost.value > b.cost.value) {
            return isAscending ? 1 : -1;
        }
        return 0;
    });
    return response;
}

export const orderByDate = (array, isAscending) => {
    const response = array.sort((a, b) => {
        var c = new Date(a.cdrDate.dateTime);
        var d = new Date(b.cdrDate.dateTime);
        if (c < d) {
            return isAscending ? -1 : 1;
        }
        if (c > d) {
            return isAscending ? 1 : -1;
        }
        return 0;
    });
    return response;
};

export const formatCost = (currency, cost) => {
    if (cost < 0) {
        const number = Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(round(Math.abs(cost), 2)).toFixed(2));
        const response = `-${currency} ${number}`;
        return response;
    } else {
        return `${currency} ${Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(round(cost, 2)).toFixed(2))}`;
    }
}