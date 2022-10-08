
/*
    Math.random()  -   0.0 이상 1.0 미만의 랜덤값 생성
    Math.floor() - 소수점 내림
    Math.ceil() - 소수점 올림

    # 1 ~ 10까지의 랜덤 정수

    Math.random() * 10                 -   0.0 <=  ~~  < 10.0
    Math.floor(Math.random() * 10)     -    0 <=  ~~  < 10
    Math.floor(Math.random() * 10) + 1 -    1 <=  ~~  < 11


    # x ~ y까지의 랜덤 정수 공식

    Math.floor(Math.random() * (y - x + 1)) + x

*/


// ============= 함수, 전역변수 정의 영역 ===============//

// 게임 데이터에 필요한 값들을 저장할 전역변수 객체
const gameDatas = {
    secret: Math.floor(Math.random() * 100) + 1, // 실제 정답 숫자
    answer: 0, // 사용자가 선택한 숫자 
    min: 1,    // 범위의 현재 최소값
    max: 100,    // 범위의 현재 최대값
};


// 숫자 아이콘 초기 생성 함수
function makeIcons() {

    const $numbers = document.getElementById('numbers');

    // 렌더링 전 상태의 가상돔 하나 더 생성
    const $vDiv = document.createDocumentFragment();

    // div.icon 100개 생성
    for (let i = 1; i <= 100; i++) {
        const $div = document.createElement('div');
        $div.classList.add('icon');
        $div.textContent = i;

        $vDiv.appendChild($div);
    }

    $numbers.appendChild($vDiv)

}

// 범위 밖에 아이콘 제거 처리 함수 정의
function removeIcons($target, isUp) {
    
    const $numbers = document.getElementById('numbers');
    /*
        #1. up이면 타겟div부터 시작해서 이전형제들을 모두 제거
        #2. down이면 타겟div부터 시작해서 다음형제들을 모두 제거
    */
    
    // $delTarget: 지워야 할 대상
    let $delTarget = $target;

    while ($delTarget) {
        let $nextTarget 
            = isUp 
            ? $delTarget.previousElementSibling
            : $delTarget.nextElementSibling;

        $numbers.removeChild($delTarget);
        $delTarget = $nextTarget;
    }
}

// UP, DOWN 처리를 진행하는 함수
function processUpDown(isUp, $target) {

    const ANI_CLASS = 'jump';

    const [$up, $down] =
    [...document.querySelector('aside.result').children];
    
    if (isUp) {  // UP인경우        
        // min값 보정
        gameDatas.min = gameDatas.answer + 1;
        document.getElementById('begin').textContent = gameDatas.min;

        // 애니메이션 처리
        $down.classList.remove(ANI_CLASS);
        $up.classList.add(ANI_CLASS);

    } else {     // DOWN인 경우        
        // max값 보정
        gameDatas.max = gameDatas.answer - 1;
        document.getElementById('end').textContent = gameDatas.max;

        // 애니메이션 처리
        $up.classList.remove(ANI_CLASS);
        $down.classList.add(ANI_CLASS);
    }
    console.log(gameDatas);

    // 범위 밖에 아이콘 제거 처리
    removeIcons($target, isUp);

}

// 정답일 경우 후속처리 함수
function processCorrect($target) {

    // 축하박스 등장 (애니메이션 처리)
    document.getElementById('finish').classList.add('show');

    // 빙글빙글 아이콘
    $target.setAttribute('id', 'move');

    // 클릭 이벤트 중지
    document.getElementById('numbers').onclick = null;
}

// 정답을 검증하는 함수 정의
function checkAnswer($target) {


    if (gameDatas.secret === gameDatas.answer) {  // 정답인 경우
        processCorrect($target);
    } else if (gameDatas.secret > gameDatas.answer) { // UP인 경우
        processUpDown(true, $target);
    } else { // DOWN인 경우
        processUpDown(false, $target);
    }
}


// ============= 메인 실행 영역 ================//
(function() {

    makeIcons();

    // 아이콘 클릭 이벤트 부여
    document.getElementById('numbers').onclick = function(e) {
        
        if (!e.target.matches('#numbers .icon')) {
            return;
        }


        // console.log('아이콘 클릭!');

        // console.log(e.target.textContent);

        // answer의 값을 변경
        gameDatas.answer = +e.target.textContent;

        // 정답을 검증
        checkAnswer(e.target);
    };

}) ();