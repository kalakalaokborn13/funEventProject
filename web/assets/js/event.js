/* 頁首輪播 */
let slideEleArr = Array.from(document.querySelector(".event-intro-carousel").querySelectorAll(".slide"));
let ctrlBtnEleArr = Array.from(document.querySelector(".event-intro-carousel__ctrl-box").querySelectorAll(".ctrl-btn"));
let goPrevBtnEle = document.querySelector("#caro-prev-btn");
let goNextBtnEle = document.querySelector("#caro-next-btn");
let caroActiveIndex = 0;

goNextBtnEle.addEventListener("click", function () {
    const goNum = 1;
    const topNum = slideEleArr.length - 1;
    caroActiveIndex = cyclingNum(caroActiveIndex, goNum, topNum);
    updateCaro();
});

goPrevBtnEle.addEventListener("click", function () {
    const goNum = -1;
    const topNum = slideEleArr.length - 1;
    caroActiveIndex = cyclingNum(caroActiveIndex, goNum, topNum);
    updateCaro();
});

ctrlBtnEleArr.forEach((ctrlBtn, index) => {
    ctrlBtn.addEventListener("click", function () {
        caroActiveIndex = index;
        updateCaro();
    });
});

// 依照現在的caroActiveIndex更新輪播
function updateCaro() {
    switchActive(slideEleArr, caroActiveIndex);
    switchActive(ctrlBtnEleArr, caroActiveIndex);
}

// 切換active元素，arrToSwitch => 要被切換的陣列、targetIndex => 切換目標index
function switchActive(arrToSwitch, targetIndex) {
    arrToSwitch.forEach((arrEle) => {
        arrEle.classList.remove('active');
    });
    arrToSwitch[targetIndex].classList.add('active');
}

// 循環botNum-topNum
// 1. 要移動的步數diff % 區間長度 = 真正要移動的步數
// 2. 從fromNum開始移動，移動到超出區間範圍就要回到另一端
// 3. 做序數修正
// 參數名稱 => fromNum: 開始數字，diff: 要移動的步數，topNum, botNum: 循環區間最大(小)值
function cyclingNum(fromNum, diff, topNum, botNum = 0) {
    // 循環數字的區間長度，大減小後+1才會是正確的長度
    let numLength = topNum - botNum + 1;
    let result = 0;
    // 當result超過範圍的時候應該要立刻回到另一端並算做一次計數，然而在我們的計算過程中這個計數被忽略了，所以要校正
    // 例如，假設現在區間範圍是-1~4，當從4再往上加1的時候應該要直接變成-1，但我們的計算會將他算成4+1=5，所以要-1做校正
    const ordinalCorrect = 1;
    // 往前或後移動的步數
    let move = diff % numLength;
    result = fromNum + move;
    // 超出移動範圍就循環
    if (result > topNum) {
        result = botNum + (result - topNum) - ordinalCorrect;
    } else if (result < botNum) {
        result = topNum - (botNum - result) + ordinalCorrect;
    }
    return result;
}

/* 內部導覽列 */
let innerNavOriginTop = $(".event-inner-nav").position().top;
// console.log(innerNavOriginTop);
// 滾動時
$(window).scroll(function (ev) {
    let eventInnerNav = $(".event-inner-nav");
    let navBtns = $(".event-inner-nav .event-inner-nav__btn")

    // console.log($(this).scrollTop());
    // console.log(eventInnerNav.position().top);
    // 移動超過內部導覽列一開始的位置後
    if ($(this).scrollTop() > innerNavOriginTop) {
        // 移動
        // $(".event-inner-nav").css('position', "sticky");
        $(".event-inner-nav").css('top', $(this).scrollTop() - innerNavOriginTop);
        // 改變圓角
        $.each(navBtns, (index, btn) => {
            btn.style.borderRadius = "0px";
        });
    } else {
        $(".event-inner-nav").css('top', 0);
        $.each(navBtns, (index, btn) => {
            btn.style.borderRadius = "20px 20px 0 0";
        });
    }
    // 介於特定位置時按鈕變色


});
// 按下按鈕自動滾動
$(".event-inner-nav__btn").each((index, btn) => {
    let data = btn.dataset;
    let targetPos = $(`#${data.scrollto}`).offset();
    btn.addEventListener("click", function () {
        $("html, body").animate({
            scrollTop: targetPos.top - $(".event-inner-nav").height()
        }, 500);
    });
});

/* 活動方案懸浮面板 */
let planBoardOriginTop = $(".event-plan-board").offset().top;
// console.log(planBoardOriginTop);
console.log();

let planBoardGap = 30;
$(window).scroll(function (ev) {
    // 移動超過方案面板一開始的位置後
    if ($(this).scrollTop() + planBoardGap > planBoardOriginTop) {
        // 移動
        $(".event-plan-board").css('top', $(this).scrollTop() - planBoardOriginTop + planBoardGap);
    } else {
        $(".event-plan-board").css('top', 0);
    }
})