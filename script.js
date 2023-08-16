//https://rikatillsammans.se/verktyg/kalkylator-rakna-pa-ranta-pa-ranta/
//https://plotly.com/javascript/line-charts/
//https://rikatillsammans.se/ranta-pa-ranta-formler-excels-slutvarde-och-min-kalkylator/
const questions = document.querySelectorAll('.question')
const calculateBtn = document.getElementById('calculateBtn')
const answer = document.getElementById('answer')
const questionContainer = document.getElementById('questionContainer')
const yearsTakenDiv = document.getElementById('yearsTaken')
const nextBtns = document.querySelectorAll('#nextBtn');

// Global array for controlling line chart
let yearsArray = [0,]  //Add start value to lineChart (Y-axel)
let capArray = []   //(X-Axel)

//Trigger for moveInput
let moved = 0

//Render the chart after moveInput() is done with transitions
function moveInputAndThenUpdateChart(){
moveInput()
questionContainer.addEventListener('transitionend', () => {
    updateLineChart()
    moved = 1
})

}

//Call all the functions when the calculate button is clicked. 
calculateBtn.addEventListener('click', () => {
    endResult ()
})

//Calculate all the numbers from user. 
function calculate (){

//add all the inputs from user : Make a number, and removed any none numbers (Space, ., , ect)
let moneyAmount = parseFloat(document.getElementById('q1').value.replace(/[^\d.]/g, ''))
let startAmount = parseFloat(document.getElementById('q2').value.replace(/[^\d.]/g, ''))
let savedAmount = parseFloat(document.getElementById('q3').value.replace(/[^\d.]/g, ''))
let interestAmount = parseFloat(document.getElementById('q4').value.replace(/[^\d.]/g, ''))

let cap = startAmount

//Clean array and Add the starting value to the array for line chart
capArray = []
capArray.push(startAmount)
//Clear Years array
yearsArray = []
yearsArray.push(0)

    for (let i=1 ; i < 100 ; i++){
    
    cap += (savedAmount * 12)
    let addInterest = cap * (interestAmount/100)
    cap += addInterest
    yearsArray.push(i)
    capArray.push(Math.floor(cap))

        if ( cap > moneyAmount){
            yearsTakenDiv.innerHTML= `It would take ${i} years to reach that goal`
            break
        }
    }
}

//Add class so the input screen moves.
function moveInput(){
    const questionSliderCss = document.getElementById('question-slider')
    questionSliderCss.href = 'question-slider-after.css'
}

//Add or Remove a class name to the nextBtn
function showInputFocus(index){
    
    console.log(index)

    const inputElements = document.querySelectorAll('input[type="text"]')

    if (index == 3){
        endResult ()
    }

    questions[index].classList.remove('active')
    questions[index + 1].classList.add('active')
    inputElements[index + 1].focus()
}

//Make all the 'nextBtn' work
nextBtns.forEach((button, index) => {
    button.addEventListener('click', () => {
        showInputFocus(index)
    })
})

// User can use 'Enter' to go next.
questions.forEach((button, index) => {
button.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        showInputFocus(index)
    }
})
})

function updateLineChart () {
    
//Remove info in chart div. 
const chartDiv = document.getElementById('chart')
chartDiv.innerHTML = ''
//Create a new canvas
chartDiv.innerHTML = '<canvas id="myLineChart"></canvas>'

    makeLineChart()
}


//This will make the LineChart
function makeLineChart (){

 const ctx = document.getElementById('myLineChart')

    new Chart(ctx, {
        type: 'line',
    
        data: {
          labels: yearsArray,
          datasets: [{
            label: 'Money growth',
            backgroundColor: 'rgb(69, 131, 212)',
            borderColor: 'rgb(69, 131, 212)',
            data: capArray,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}


function formatNumbers(input) {
    var value = input.value.replace(/ /g, ''); // Remove any existing spaces
    var formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') // Add thousand separators
    input.value = formattedValue
}

 function endResult (){
        calculate()
        
        if (moved == 0){
            moveInputAndThenUpdateChart()
        }
        
        else {
updateLineChart()
        }
        
}