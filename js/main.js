//Questians array
const questions = [
    {question: 'Enter Your First Name'},
    {question: 'Enter Your Last Name'},
    {question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/},
    {question: 'Create A Password', type: 'password'}
];

//transition times
const shakeTime = 100; //shake transition time
const switchTime = 200; // trasition between questions

//init position at first questions
let position = 0;

//init DOM elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

//events

//get que on DOM load
document.addEventListener('DOMContentLoaded',getQuestion);

//next btn click
nextBtn.addEventListener('click',validate);

//input field enter click
inputField.addEventListener('keyup',e => {
    if(e.keyCode==13){
        validate();
    }
})

//functions

//get que from array and add to markup
function getQuestion(){

    //get current que
    inputLabel.innerHTML = questions[position].question;
    //get current type
    inputField.type = questions[position].type || 'text';
    //get current ans
    inputField.value = questions[position].answer || '';
    //focus on current element
    inputField.focus();

    //set progress bar width - variable to the question length
    progress.style.width = (position*100)/questions.length + '%';

    //add user icon OR back arrow depending on que
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();
}

//display que to user
function showQuestion(){
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width='100%';
}

//hide que from user
function hideQuestion(){
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

//transform to create shake motion
function transform(x,y){
    formBox.style.transform = `translate()${x}px, ${y}px`;

}

//validate field
function validate(){
    //make sure pattern match if there is one
    if(!inputField.value.match(questions[position].pattern || /.+/)){ 
        inputFail();
    }else{
        inputPass();
    }
}

// function input Fail
function inputFail(){
    formBox.className = 'error';

    //repear shake motion - set i to number of shakes
    for (let i = 0; i < 6; i++){
        setTimeout(transform, shakeTime * i,((i%2)*2-1)*20,0);
        setTimeout(transform, shakeTime * 6,0,0);
        inputField.focus();
    }

}

// function input Pass
function inputPass(){
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    //store and in array
    questions[position].answer = inputField.value;

    //increment postiton
    position++;
    
    //if new que hide current get next
    if(questions[position]){
        hideQuestion();
        getQuestion();
    }else{

        //remove if no more question
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';

        //form complete
        formComplete();
    }
}

//all fields complete - show h1
function formComplete() {
    console.log(questions);
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} You are registered and will get an email shortly`));
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000);
}