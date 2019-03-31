export const add = (a1, a2) => {
    const array = [];
    a1.forEach((a, i) => array.push(a + a2[i]));
    return array;
};
