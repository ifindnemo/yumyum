function $(selector, all = false) {
  if (all) return document.querySelectorAll(selector);
  return document.querySelector(selector);
}
let quizData = [
  {
    question: "KNN (K-Nearest Neighbors) là gì?",
    a: "Một thuật toán học máy dựa trên cây quyết định",
    b: "Một thuật toán học máy dựa trên việc tìm kiếm các điểm gần nhất",
    c: "Một thuật toán học máy dựa trên mạng nơ-ron",
    d: "Một thuật toán học máy dựa trên hồi quy tuyến tính",
    correct: "b",
    isCorrect: false
  },
  {
    question: "KNN hoạt động như thế nào?",
    a: "Nó tìm kiếm các điểm gần nhất và tính toán trung bình của các điểm đó",
    b: "Nó sử dụng một hàm chi phí để tối ưu các tham số",
    c: "Nó nhóm các điểm dữ liệu thành các cụm dựa trên độ tương đồng",
    d: "Nó phân loại dựa trên khoảng cách giữa các điểm dữ liệu",
    correct: "d",
    isCorrect: false
  },
  {
    question: "Trong thuật toán K-means, giá trị 'K' đại diện cho gì?",
    a: "Số lượng thuộc tính của mỗi điểm dữ liệu",
    b: "Số lượng đặc trưng trong dữ liệu",
    c: "Số lượng nhóm (cụm) cần phân loại",
    d: "Số lượng lần lặp khi thuật toán dừng lại",
    correct: "c",
    isCorrect: false
  },
  {
    question: "K-means hoạt động như thế nào?",
    a: "Nó sử dụng một mạng nơ-ron để phân loại dữ liệu",
    b: "Nó nhóm dữ liệu thành K nhóm dựa trên các giá trị trung bình",
    c: "Nó phân loại dữ liệu dựa trên các phương trình tuyến tính",
    d: "Nó chọn các điểm trung tâm ngẫu nhiên và phân loại dựa trên khoảng cách",
    correct: "b",
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
  quizData = [
    {
      question: "KNN (K-Nearest Neighbors) là gì?",
      a: "Một thuật toán học máy dựa trên cây quyết định",
      b: "Một thuật toán học máy dựa trên việc tìm kiếm các điểm gần nhất",
      c: "Một thuật toán học máy dựa trên mạng nơ-ron",
      d: "Một thuật toán học máy dựa trên hồi quy tuyến tính",
      correct: "b",
      isCorrect: false
    },
    {
      question: "KNN hoạt động như thế nào?",
      a: "Nó tìm kiếm các điểm gần nhất và tính toán trung bình của các điểm đó",
      b: "Nó sử dụng một hàm chi phí để tối ưu các tham số",
      c: "Nó nhóm các điểm dữ liệu thành các cụm dựa trên độ tương đồng",
      d: "Nó phân loại dựa trên khoảng cách giữa các điểm dữ liệu",
      correct: "d",
      isCorrect: false
    },
    {
      question: "Trong thuật toán K-means, giá trị 'K' đại diện cho gì?",
      a: "Số lượng thuộc tính của mỗi điểm dữ liệu",
      b: "Số lượng đặc trưng trong dữ liệu",
      c: "Số lượng nhóm (cụm) cần phân loại",
      d: "Số lượng lần lặp khi thuật toán dừng lại",
      correct: "c",
      isCorrect: false
    },
    {
      question: "K-means hoạt động như thế nào?",
      a: "Nó sử dụng một mạng nơ-ron để phân loại dữ liệu",
      b: "Nó nhóm dữ liệu thành K nhóm dựa trên các giá trị trung bình",
      c: "Nó phân loại dữ liệu dựa trên các phương trình tuyến tính",
      d: "Nó chọn các điểm trung tâm ngẫu nhiên và phân loại dựa trên khoảng cách",
      correct: "b",
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