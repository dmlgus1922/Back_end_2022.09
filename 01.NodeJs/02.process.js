console.log('process.env:', process.env); // 환경 설정
console.log(process.env.COMPUTERNAME); // object라 이렇게 뽑을 수 있음.
console.log('process.version:',process.version); // NodeJS의 버전
console.log('process.arch:',process.arch);
console.log('process.platform:',process.platform);
console.log('process.argv:',process.argv);

process.exit(0); // 정상 종료. 코드값이 -1은 비정상 종료

console.log('procee.exit() 이후엔 실행이 안 된다.'); // unreachable

// Hoisting 선언한 함수, 변수 등은 실행했을 때는 위에서 쫙 생긴다. 유효 범위의 최상단에서.
function a() {
    let a = 1;
    return a;
    let b = 3; // unreachable
}
var a = 5;
var b;

// 프로그램이 실행되면 그게 프로세스