// Language points
const languagePoints = {
  "Frontend": 0, 
  "Backend": 0,  
  "AI": 0, 
  "FullStack": 0,  
  "Game": 0,
  "Mobile": 0,
  "DataScience": 0,
  "Cyber": 0,
};

// Get Questions
async function getQuestions() {
  const response = await fetch("questions.json")
  const data = await response.json()
  return data
}
let data = []


let questionNumber = 0
let questionTitle = document.getElementById("question-title")
let questionAnswers = document.getElementById("question-answers-list")
let infoQuestion = document.getElementById("info-questions")

// First question showing up when the page is loaded
addEventListener("load", async () => {
  data = await getQuestions()
  infoQuestion.innerHTML = `Soru ${questionNumber + 1} / ${data.length}`
  questionTitle.innerHTML = data[questionNumber].question
  for (let i = 0; i < data[questionNumber].answers.length; i++) {
    questionAnswers.innerHTML += `
          <label for="${i}" id="answers${i}" class="step_1 animate__animated animate__fadeInRight animate_25ms position-relative rounded-pill text-start text-white" onclick="selectAnswers(${i})">
          ${data[questionNumber].answers[i]["answer"]}
          <input id="${i}" type="radio" name="stp_1_select_option" value=" Frontend : ${data[questionNumber].answers[i]["points"]["Frontend"]} , Backend : ${data[questionNumber].answers[i]["points"]["Backend"]} , AI : ${data[questionNumber].answers[i]["points"]["AI"]} , FullStack : ${data[questionNumber].answers[i]["points"]["FullStack"]} ">
          </label>
          `
  }
  questionNumber++
})

// Select answers function
let selectAnswersNum = 9
function selectAnswers(id) {
  if (selectAnswersNum == 9) {
    selectId = "answers" + id
    let selectAnswers = document.getElementById(selectId)
    selectAnswers.classList.add("active")
    selectAnswersNum = id
  } else {
    selectId = "answers" + selectAnswersNum
    let selectAnswers = document.getElementById(selectId)
    selectAnswers?.classList?.remove("active")
    selectAnswersNum = id
    selectId = "answers" + selectAnswersNum
    selectAnswers = document.getElementById(selectId)
    selectAnswers.classList.add("active")
  }
}

// Next question function
let nextQuestion = document.getElementById("next-question")
nextQuestion.addEventListener("click", async () => {
  if (nextQuestion.classList.contains("finish")) {
    console.log(questionNumber, "QN")
    console.log("son soru")
    // Evaluate answers points function languagePoints add
    evaluatePoints(0)
    console.log(languagePoints);
    languagePointsFunction()
    return
  }


  function checkForActiveClass(nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].classList.contains("active")) {
        return true;
      }
    }
    return false;
  }


  let questionAnswersChild = document.getElementById("question-answers-list").children;
  let isActive = checkForActiveClass(questionAnswersChild);
  if (isActive) {
    if (questionNumber >= data.length - 1) {
      // Next question
      infoQuestion.innerHTML = `Soru ${questionNumber + 1} / ${data.length}`
      questionTitle.innerHTML = data[questionNumber].question
      questionAnswers.innerHTML = ""
      for (let i = 0; i < data[questionNumber].answers.length; i++) {
        questionAnswers.innerHTML += `
              <label for="${i}" id="answers${i}" class="step_1 animate__animated animate__fadeInRight animate_25ms position-relative rounded-pill text-start text-white" onclick="selectAnswers(${i})">
              ${data[questionNumber].answers[i]["answer"]}
               <input id="${i}" type="radio" name="stp_1_select_option" value=" Frontend : ${data[questionNumber].answers[i]["points"]["Frontend"]} , Backend : ${data[questionNumber].answers[i]["points"]["Backend"]} , AI : ${data[questionNumber].answers[i]["points"]["AI"]} , FullStack : ${data[questionNumber].answers[i]["points"]["FullStack"]} ">
            </label>
              `
      }
      console.log(selectAnswersNum, "SELECTANSWERSNUM", data[questionNumber - 1])
      // Evaluate answers points function languagePoints add
      evaluatePoints()
      let button = document.getElementById("next-question")
      button.classList.add("finish")
      button.innerHTML = "TESTİ BİTİR"

    }
    else {

      // Next question
      infoQuestion.innerHTML = `Soru ${questionNumber + 1} / ${data.length}`
      questionTitle.innerHTML = data[questionNumber].question
      questionAnswers.innerHTML = ""
      for (let i = 0; i < data[questionNumber].answers.length; i++) {
        questionAnswers.innerHTML += `
              <label for="${i}" id="answers${i}" class="step_1 animate__animated animate__fadeInRight animate_25ms position-relative rounded-pill text-start text-white" onclick="selectAnswers(${i})">
              ${data[questionNumber].answers[i]["answer"]}
               <input id="${i}" type="radio" name="stp_1_select_option" value=" Frontend : ${data[questionNumber].answers[i]["points"]["Frontend"]} , Backend : ${data[questionNumber].answers[i]["points"]["Backend"]} , AI : ${data[questionNumber].answers[i]["points"]["AI"]} , FullStack : ${data[questionNumber].answers[i]["points"]["FullStack"]}, Cyber : ${data[questionNumber].answers[i]["points"]["Cyber"]}, Game : ${data[questionNumber].answers[i]["points"]["Game"]}, Mobile : ${data[questionNumber].answers[i]["points"]["Mobile"]}, DataScience : ${data[questionNumber].answers[i]["points"]["DataScience"]} ">
            </label>
              `
      }
      console.log(selectAnswersNum, "SELECTANSWERSNUM", data[questionNumber - 1])
      // Evaluate answers points function languagePoints add
      evaluatePoints()
      console.log(languagePoints);
      console.log(questionNumber, "QN2")
      questionNumber++
    }
  } else {
    alert("Lütfen bir cevap seçin.")
  }
})

// Finish button
let finishButton = document.getElementsByClassName("finish")


// Language points function
function languagePointsFunction() {
  let languagePointsArray = Object.values(languagePoints)
  let languagePointsMax = Math.max(...languagePointsArray)
  let languagePointsMaxIndex = languagePointsArray.indexOf(languagePointsMax)
  let languagePointsMaxName = Object.keys(languagePoints)[languagePointsMaxIndex]
  console.log("languagePointsMaxName",languagePointsArray);
  window.location.href = `/page/${languagePointsMaxName}.html`
}

function evaluatePoints(num = 1) {
  languagePoints["Frontend"] += parseInt(data[questionNumber - num].answers[selectAnswersNum]["points"]["Frontend"])
  languagePoints["Backend"] += parseInt(data[questionNumber - num].answers[selectAnswersNum]["points"]["Backend"])
  languagePoints["AI"] += parseInt(data[questionNumber - num].answers[selectAnswersNum]["points"]["AI"])
  languagePoints["Game"] += parseInt(data[questionNumber - num].answers[selectAnswersNum]["points"]["Game"])
  languagePoints["Mobile"] += parseInt(data[questionNumber - num].answers[selectAnswersNum]["points"]["Mobile"])
  languagePoints["DataScience"] += parseInt(data[questionNumber - num].answers[selectAnswersNum]["points"]["DataScience"])
  languagePoints["Cyber"] += parseInt(data[questionNumber - num].answers[selectAnswersNum]["points"]["Cyber"])
  languagePoints["FullStack"] += parseInt(data[questionNumber - num].answers[selectAnswersNum]["points"]["FullStack"])
}

