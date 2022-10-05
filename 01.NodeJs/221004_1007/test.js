for (let i=100; i<1000; i++) {
    let first = parseInt((i % 1000) / 100);
    let second = parseInt((i % 100) / 10);
    let third = (i % 10);
    if((first ** 3) + (second ** 3) + (third ** 3) == i)
        console.log(i);
}