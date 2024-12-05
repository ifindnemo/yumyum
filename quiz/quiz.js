function $(selector, all = false) {
    if (all) return document.querySelectorAll(selector);
    return document.querySelector(selector);
  }
  let quizData = [{
    question: "What is Stand for ARMY?",
    a: "Alien Research Multiverse Yok",
    b: "Ayush Raj Mohit Yammi",
    c: "All Race Motors Yet",
    d: "Ankush Raj Mahe Yam",
    correct: "d",
  }, {
    question: "What is ARMY",
    a: "Community of Leaders",
    b: "Community of Content Creator",
    c: "A Unity of BTS",
    d: "All of the above",
    correct: "b",
  }, {
    question: "Who is the founder of ARMY",
    a: "Ankush Raj Mahe Yam",
    b: "Ayush Raj Mahe Yam",
    c: "Ansh Raj Mahe Yam",
    d: "None of These",
    correct: "a",
  }, {
    question: "ARMY company founded in",
    a: "2000",
    b: "2020",
    c: "2024",
    d: "none of the above",
    correct: "b",
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
      question: "Đâu là phát biểu chính xác?",
    a: "Deep learning là AI",
    b: "AI là Machine learning",
    c: "AI là Deep learning",
    d: "Tất cả đáp án đều đúng",
    correct: "a",
    }, {
      question: "CNN là gì?",
    a: "Cable News Network",
    b: "Convolutional Neural Network",
    c: "Computer Neural Network",
    d: "Convictional Neural Network",
    correct: "b",
    }, {
      question: "Đâu là một khái niệm trong Neural network?",
    a: "Gradient Descent",
    b: "Backpropagation",
    c: "Perceptron",
    d: "Tất cả đáp án đều đúng",
    correct: "d",
    }, {
      question: "SVM có thể phân lớp dữ liệu không phân tách tuyến tính không?",
    a: "Có",
    b: "Không",
    c: "Đoán xem",
    d: "Bạn hỏi tôi, tôi hỏi ai",
    correct: "a",
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
    currentQuiz = quizData[index - 1]
    console.log(currentQuiz.checked)
    main.innerHTML = `
                  <div class="top-bar" >
                      <div>Question 
                          <span class="q-number">${index}/${quizData.length}</span>
                      </div>
                      <div class="time" >30s</div>
                  </div>
                  <div class="time-bar" >
                      <div class="time-left" ></div>
                  </div>
                  <div class="question" >${currentQuiz.question}</div>
                  <form>
                      <div class="box" >
                          <input  name="answer" type="radio" value="a"  ${currentQuiz.checked=="a" ? "checked=checked" :''} />
                          <label> ${currentQuiz.a} </label>
                      </div>
                      <div class="box" >
                          <input c name="answer" type="radio" value="b" ${currentQuiz.checked=="b" ? "checked=checked" :''} />
                          <label>${currentQuiz.b}</label>
                      </div>
                      <div class="box" >
                          <input value="c" name="answer" type="radio" ${currentQuiz.checked=="c" ? "checked=checked" :''} />
                          <label> ${currentQuiz.c} </label>
                      </div>
                      <div class="box" >
                          <input value="d" name="answer" type="radio" ${currentQuiz.checked=="d" ? "checked=checked" :''} />
                          <label> ${currentQuiz.d} </label>
                      </div>
                  </form>
                  <div class="bottom-bar" >
                      <button class="prev ${index<=1 && 'hidden'}"  >Prev
                      </button>
                      <button class="next" ${currentQuiz?.checked==undefined ? "disabled=disabled" :''} >${index>=quizData.length ? "See Result" :"Next"}</button>
                  </div>`
    renueEle()
    clearInterval(timer)
    restartTimer()
  }
  
  function createListeners() {
    /*event listeners */
    boxEle.forEach(box => {
      box.onclick = (e) => {
        boxEle.forEach(box => box.classList.remove("active"))
        box.querySelector("[name]").click()
        box.classList.add("active")
      }
    })
    formEle.onchange = (e) => {
      const answer = e.target.value
      nextEle.removeAttribute("disabled")
      currentQuiz.checked = answer
      if (currentQuiz.isCorrect == true) {
        score -= 1
      }
      if (answer == currentQuiz.correct) {
        score += 1
        currentQuiz.isCorrect = true
      }
    }
    nextEle.onclick = next
    prevEle.onclick = prev
  }
  
  function next() {
    currentIndex += 1
    if (currentIndex > quizData.length) {
      return seeResult()
    }
    initialize(currentIndex)
  }
  
  function prev() {
    currentIndex -= 1
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
    startEle.onclick = start
  }