// 3. 체질량 지수(BMI)를 계산하는 공식은 몸무게를 키(m)의 제곱으로 나눈 값입니다. 사용자에게 키(cm)와
//    몸무게(kg)에 해당하는 값을 전달받아 체질량 지수를 계산합니다. 체질량 지수가 26점 이상이면 비만,
//    24~25점은 과체중, 18.5~23점은 정상, 18.5점 미만은 저체중을 반환하는 함수를 만들어 보세요.
const BMI = (weight, height) => {
    let bmi = weight / (height ** 2)
    if(bmi >= 26)
        console.log('비만');
    else if(bmi >= 24 && bmi <= 25)
        console.log('과체중');
    else if(bmi >= 18.5 && bmi <= 23)
        console.log('정상');
    else if(bmi < 18.5)
        console.log('저체중');
}
BMI(100, 1.8);