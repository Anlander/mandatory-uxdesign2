let questions = [];
let main = document.querySelector('.main');
let h1 = document.querySelector('h1');
let count = 0;
let body = document.querySelector('body');
let scale = document.querySelector('.scale');
let result = document.createElement('h3');
let closeall = document.getElementById('closeAll')
let donepop = document.querySelector('.donepop');

let btn = document.querySelector('.start')
btn.addEventListener('click', function(){
  fetch("https://opentdb.com/api.php?amount=10")
                  .then(res => res.json())
                  .then(result => {
                    let obj = {}
                    questions = []
                    result.results.map(mapres => {
                      mapres.incorrect_answers.push(mapres.correct_answer)
                      obj = {
                        question:mapres.question,
                        incorrect_answers:mapres.incorrect_answers,
                        correct_answer:mapres.correct_answer,

                      }
                      questions.push(obj)
                    })
                      btn.style.display = "none";
                      renderTable()
                      console.log(fetch)

                  })
                })

function renderTable(){
    main.removeAttribute('style')
    questions.map(el =>{
      let questionCard = document.createElement('div');
      let question = document.createElement('div');
      question.innerHTML = el.question
      //console.log(decodeURIComponent(el.question))
      let answer = document.createElement('div');

      el.incorrect_answers.map(aws =>{
        let radiobtn = document.createElement('input');
        let label = document.createElement('label');
        radiobtn.setAttribute('type', 'radio');
        radiobtn.setAttribute('name', 'name' + count);
        radiobtn.setAttribute('value', aws);
        label.innerHTML = aws;
        answer.appendChild(label);
        answer.appendChild(radiobtn);



        //console.log(radiobtn);


        label.classList.add("label");
        questionCard.classList.add("questionCard");
        question.classList.add("question");
        answer.classList.add("answer");
        radiobtn.classList.add("input");


      })



      questionCard.appendChild(question);
      questionCard.appendChild(answer);
      main.appendChild(questionCard);


      count++
    //  console.log(count);

    })

    let done = document.createElement('button');
    done.classList.add("done");
    done.textContent = "Done";
    done.addEventListener('click', renderFinalResults);
    main.appendChild(done);

  }



function renderFinalResults(){
  let correctAnswers = 0;
  let checkedRadio = [];
  let que = questions.map(answers =>{
    return answers.correct_answer
  })
  console.log(que);
  let allradio = document.querySelectorAll("input");
  for (var i = 0; i < allradio.length; i++) {
    if(allradio[i].checked) {
      checkedRadio.push(allradio[i].value)
    }
  }

  for (var i = 0; i < checkedRadio.length; i++) {
    if (checkedRadio[i] === que[i]){
      correctAnswers++
    }
  }


    let main = document.querySelector('.main');

    //console.log(donepop);


    result.classList.add("poph3")
    main.style.opacity = "0";
    donepop.style.display = 'block';
    result.textContent = `You had ${correctAnswers}/10 correct answers`;
    donepop.appendChild(result);

    let input = document.querySelectorAll('input');
    for (let all of input){
      all.setAttribute("disabled", true);
      main.style.overflow = "hidden";

   }
 }



function reset (){
  main.removeChild(main.firstChild);
  closeall.style.display = "none";
  btn.style.display = 'block';
  main.style.overflow = "auto";
  let input = document.querySelectorAll('input');
  for (let all of input){
  all.removeAttribute("disabled");
  while(main.firstChild) {
       main.removeChild(main.firstChild)
     }
     result.remove()

   }
 }




let cl = document.querySelector('.close');
cl.addEventListener('click', reset);

let res = document.querySelector('.restart');
res.addEventListener('click', reset);
