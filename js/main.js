function getRandomPositiveInteger(n1, n2) {
    if(n1>=0&&n2>=0&&n1!==n2&&Number.isFinite(n1)&&Number.isFinite(n2)){
       const lower = Math.ceil(Math.min(n1,n2));
       const upper = Math.floor(Math.max(n1,n2));
       return Math.floor(Math.random() * (upper - lower + 1)) + lower; 
    }
    return NaN
}

function getRandomPositiveFloat(n1, n2, digits) {
    if(n1>=0&&n2>=0&&n1!==n2&&digits>0&&Number.isFinite(n1)&&Number.isFinite(n2)){
       const lower = Math.min(n1,n2);
       const upper = Math.max(n1,n2);
       const result = Math.random() * (upper - lower) + lower; 
       return Number(result.toFixed(digits))
    }
    return NaN
}

getRandomPositiveInteger(4,9)
getRandomPositiveFloat(1.2,2.6,4)