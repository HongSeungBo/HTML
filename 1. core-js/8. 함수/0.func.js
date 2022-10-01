// 2개의 정수를 전달하면 그 합을 리턴하는 함수

function add(n1, n2){

    return n1 + n2;
}
//함수 속 내용물은 콜을 했을 때에만 작동

function multi(n1, n2){
    console.log(`${n1} x ${n2} = ${n1 * n2}`);
}

multi(add(5, 3), add(9, 7));

var rs = add(add(add(5, 7), add(7, 9)),add(add(6, 8), add(1, 3)));

console.log(rs);

