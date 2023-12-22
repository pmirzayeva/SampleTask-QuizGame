// Constants for HTML elements
const questionTitle=document.querySelector("#questionTitle")
const btnGroup=document.querySelector("#answer-buttons")
const progressBar=document.querySelector("#progressBar")
const questionContainer=document.querySelector("#question-container")
const restartBtn=document.querySelector("#restartBtn")
const resultDiv=document.querySelector("#result")


// Question Game Class
class QuestionGame{
  score=0
  nextQindex= -1
  qData=[]
  currentQ=null


  constructor(data){
      this.qData=data
  }

  nextQuestion(){
      if(this.nextQindex == this.qData.length -1){
          console.log("oyun bitdi");
          this.endQuiz()
          return false

      }else{
          this.nextQindex += 1
          const questionItem=this.qData[this.nextQindex]
          this.currentQ=questionItem
          return this.currentQ
      }
  }

  endQuiz(){
      questionContainer.style.display="none";
      restartBtn.classList.remove("hide")
      resultDiv.classList.remove("hide")
      resultDiv.innerText=`Your final score: ${this.score} / ${this.qData.length}`
      progressBar.style.width = "100%";
  }

  restart(){
    restartBtn.addEventListener("click", () => {
        this.nextQindex = -1; 
        this.score = 0;
        questionContainer.style.display="block";
        restartBtn.classList.add("hide")
        resultDiv.classList.add("hide")
        startGame(); 
      });
  }

}


const questions = [
    {
      question: "What is the capital of Germany?",
      correctAnswer: "Berlin",
      variants: ["London", "Berlin", "Paris"]
    },
    {
      question: "Who painted the Mona Lisa?",
      correctAnswer: "Leonardo da Vinci",
      variants: ["Leonardo da Vinci","Vincent van Gogh", "Pablo Picasso"]
    },
    {
      question: "What is the powerhouse of the cell?",
      correctAnswer: "Mitochondria",
      variants: ["Nucleus", "Ribosome", "Mitochondria"]
    },
    {
      question: "Who developed the theory of relativity?",
      correctAnswer: "Albert Einstein",
      variants: ["Isaac Newton","Albert Einstein", "Stephen Hawking"]
    },
    {
      question: "What is the largest planet in our solar system?",
      correctAnswer: "Jupiter",
      variants: [ "Jupiter","Saturn", "Mars"]
    },
    {
      question: "In which year did World War II end?",
      correctAnswer: "1945",
      variants: ["1918", "1945", "1955"]
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      correctAnswer: "William Shakespeare",
      variants: ["William Shakespeare","Charles Dickens", "Mark Twain"]
    },
    {
        question: "What is the tallest mammal?",
        correctAnswer: "Giraffe",
        variants: ["Elephant", "Giraffe", "Hippopotamus"]
      },
      {
        question: "Which planet is known as the Red Planet?",
        correctAnswer: "Mars",
        variants: ["Venus", "Mercury", "Mars"]
      },
      {
        question: "Who is known as the father of computer science?",
        correctAnswer: "Alan Turing",
        variants: ["Alan Turing", "Charles Babbage", "Ada Lovelace"]
      }
  ];

  const gameQ = new QuestionGame(questions);



  function startGame(){
    gameQ.nextQuestion()
    const qObj=gameQ.currentQ

    progressBar.style.width = ((gameQ.nextQindex + 1) / gameQ.qData.length) * 100 + "%";
    questionTitle.innerHTML=qObj.question
    btnGroup.innerHTML=qObj.variants.
    map(
        (item) => 
        `<button onclick="selectItem('${item}')">${item}</button>`)
    .join("");
    console.log(qObj);

  }
 

function selectItem(userOption) {
  const answerButtons = document.querySelectorAll("#answer-buttons button");

  answerButtons.forEach(button => {
    if (button.textContent === userOption) {
      if (userOption === gameQ.currentQ.correctAnswer) {
        button.style.backgroundColor = "green"; 
        gameQ.score += 1; 
      } else {
        button.style.backgroundColor = "red"; 
      }
      answerButtons.forEach(btn => {
        btn.disabled = true;
      });
    }
  });

  setTimeout(() => {
    answerButtons.forEach(btn => {
      btn.style.backgroundColor = ""; 
      btn.disabled = false; 
    });

    startGame();
  }, 400); 
}

startGame();
gameQ.restart()
