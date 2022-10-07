// 2. 매개변수로 배열을 전달받아 배열의 요소 중에서 가장 큰 수를 찾아 반환하는 함수를 만들어 보세요.
//    이때, 배열 안의 데이터는 모두 0보다 큰 정수라고 가정합니다.
const maxnum = (arr) => {
    let max = 0;
    for(let num of arr) {
        if (num < 0){
            return '0보다 큰 수를 넣으세요'
        }
        if(max < num) {
            max = num;
        }
    }
    return max;
}
console.log(maxnum([2, 20, 10,-1]));