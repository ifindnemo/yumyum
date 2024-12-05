function $(selector, all = false) {
  if (all) return document.querySelectorAll(selector);
  return document.querySelector(selector);
}
let quizData = [{
  question: "Naive Bayes Classifier dựa trên giả định gì?",
  a: "Dữ liệu không có sự phụ thuộc giữa các thuộc tính",
  b: "Các thuộc tính có quan hệ tuyến tính",
  c: "Dữ liệu phân tách theo phương thức K-means",
  d: "Dữ liệu luôn được phân phối theo phân phối chuẩn",
  correct: "a",
  isCorrect: false
},
{
  question: "Đặc điểm của Naive Bayes là gì?",
  a: "Nó phân loại dữ liệu theo cách không tính toán xác suất",
  b: "Nó dựa trên việc sử dụng các thuộc tính không có sự phụ thuộc với nhau",
  c: "Nó chỉ hoạt động với dữ liệu liên tục",
  d: "Nó là một thuật toán phân nhóm dữ liệu",
  correct: "b",
  isCorrect: false
},
{
  question: "Naive Bayes Classifier có thể được sử dụng để giải quyết vấn đề gì?",
  a: "Phân cụm dữ liệu",
  b: "Dự đoán giá trị liên tục",
  c: "Phân loại dữ liệu",
  d: "Tối ưu hóa các tham số trong mạng nơ-ron",
  correct: "c",
  isCorrect: false
},
{
  question: "Khi nào Naive Bayes có thể hoạt động tốt nhất?",
  a: "Khi các thuộc tính có sự phụ thuộc chặt chẽ với nhau",
  b: "Khi dữ liệu có nhiều biến mất mát",
  c: "Khi các thuộc tính độc lập với nhau",
  d: "Khi dữ liệu có phân phối chuẩn không rõ ràng",
  correct: "c",
  isCorrect: false
}, ];
let timeEle, timeBarEle, qNumberEle, formEle, nextEle, prevEle, questionEle, boxEle
let main = $("main")
let time, timer, currentQuiz, currentIndex = 1,
  score = 0,
  totalTime = 30
let startEle = $(".start")
startEle.onclick = start

function start() {
  time = undefined
  timer = undefined
  currentQuiz = undefined
  currentIndex = 1
  score = 0
  timeEle = undefined
  quizData = [{
    question: "Naive Bayes Classifier dựa trên giả định gì?",
    a: "Dữ liệu không có sự phụ thuộc giữa các thuộc tính",
    b: "Các thuộc tính có quan hệ tuyến tính",
    c: "Dữ liệu phân tách theo phương thức K-means",
    d: "Dữ liệu luôn được phân phối theo phân phối chuẩn",
    correct: "a",
    isCorrect: false
  },
  {
    question: "Đặc điểm của Naive Bayes là gì?",
    a: "Nó phân loại dữ liệu theo cách không tính toán xác suất",
    b: "Nó dựa trên việc sử dụng các thuộc tính không có sự phụ thuộc với nhau",
    c: "Nó chỉ hoạt động với dữ liệu liên tục",
    d: "Nó là một thuật toán phân nhóm dữ liệu",
    correct: "b",
    isCorrect: false
  },
  {
    question: "Naive Bayes Classifier có thể được sử dụng để giải quyết vấn đề gì?",
    a: "Phân cụm dữ liệu",
    b: "Dự đoán giá trị liên tục",
    c: "Phân loại dữ liệu",
    d: "Tối ưu hóa các tham số trong mạng nơ-ron",
    correct: "c",
    isCorrect: false
  },
  {
    question: "Khi nào Naive Bayes có thể hoạt động tốt nhất?",
    a: "Khi các thuộc tính có sự phụ thuộc chặt chẽ với nhau",
    b: "Khi dữ liệu có nhiều biến mất mát",
    c: "Khi các thuộc tính độc lập với nhau",
    d: "Khi dữ liệu có phân phối chuẩn không rõ ràng",
    correct: "c",
    isCorrect: false
  }, ];
  initialize(1)
}

function restartTimer() {
  time = totalTime
  timer = setInterval(() => {
    if (time == 0) {
      clearInterval(timer)
      next()
      return
    }
    time -= 1
    timeEle.innerText = time + "s"
    timeBarEle.style.width = (time / totalTime) * 100 + "%"
  }, 1000)
}

function renueEle() {
  timeEle = $(".time")
  timeBarEle = $(".time-left")
  qNumberEle = $(".q-number")
  formEle = $("form")
  nextEle = $(".next")
  prevEle = $(".prev")
  questionEle = $(".question")
  boxEle = $(".box", true)
  createListeners()
}

function initialize(index = 1) {
  currentQuiz = quizData[index - 1];
  // Reset checked and isCorrect properties when initializing a question
  currentQuiz.checked = undefined;
  currentQuiz.isCorrect = false;
  main.innerHTML = `
    <div class="top-bar">
      <div>Question 
        <span class="q-number">${index}/${quizData.length}</span>
      </div>
      <div class="time">30s</div>
    </div>
    <div class="time-bar">
      <div class="time-left"></div>
    </div>
    <div class="question">${currentQuiz.question}</div>
    <form>
      <div class="box">
        <input name="answer" type="radio" value="a" ${currentQuiz.checked === "a" ? "checked" : ""} />
        <label>${currentQuiz.a}</label>
      </div>
      <div class="box">
        <input name="answer" type="radio" value="b" ${currentQuiz.checked === "b" ? "checked" : ""} />
        <label>${currentQuiz.b}</label>
      </div>
      <div class="box">
        <input name="answer" type="radio" value="c" ${currentQuiz.checked === "c" ? "checked" : ""} />
        <label>${currentQuiz.c}</label>
      </div>
      <div class="box">
        <input name="answer" type="radio" value="d" ${currentQuiz.checked === "d" ? "checked" : ""} />
        <label>${currentQuiz.d}</label>
      </div>
    </form>
    <div class="bottom-bar">
      <button class="prev ${index <= 1 ? 'hidden' : ''}">Prev</button>
      <button class="next" disabled>${index >= quizData.length ? "See Result" : "Next"}</button>
    </div>`;
  renueEle();
  clearInterval(timer);
  restartTimer();
}

function createListeners() {
  /*event listeners */
  boxEle.forEach(box => {
    box.onclick = (e) => {
      boxEle.forEach(box => box.classList.remove("active"));
      const radio = box.querySelector("[name='answer']");
      radio.checked = true;
      box.classList.add("active");
      console.log(`Box with value ${radio.value} selected`); // Log selected box value
      formEle.dispatchEvent(new Event('change')); // Trigger change event
      
      console.log(`Answer selected: ${radio.value}`); // Log selected answer
      nextEle.removeAttribute("disabled");
      currentQuiz.checked = radio.value;
      if (currentQuiz.isCorrect) {
      }
      if (radio.value === currentQuiz.correct) {
        score += 1;
        currentQuiz.isCorrect = true;
      } else {
        currentQuiz.isCorrect = false;
      }
      console.log(`Current score: ${score}`); // Log current score
    }
  });
  nextEle.onclick = next;
  prevEle.onclick = prev;
}

function next() {
  currentIndex += 1;
  if (currentIndex > quizData.length) {
    return seeResult()
  }
  initialize(currentIndex)
}

function prev() {
  currentIndex -= 1;
  initialize(currentIndex)
}

function seeResult() {
  main.innerHTML = `
                <div class="question" > You scored 
                    <b>${score}</b> out of 
                    <b>${quizData.length}</b>
                </div>
                <button class="start" >Restart</button>
`
  startEle = $(".start")
  startEle.onclick = start;
}