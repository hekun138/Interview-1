// 假如一个Promise已经完成了，再.then()会怎样？


console.log('start');

let promise = new Promise(resolve => {
    setTimeout(() => {
        console.log('the promise fulfilled');
        resolve('hello, world');
    }, 1000);
});

setTimeout(() => {
    promise.then( value => {
        console.log(value);
    });
}, 3000);