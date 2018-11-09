var poolSize = 75;
var boardWidth = 5;
var numPerCol = poolSize / boardWidth;
var boardLength = 5;
//test

//create a  board from the colomn headers already in the HTML
var cols = document.querySelectorAll('.board div')
cols.forEach(createCol);
function createCol(value, index, list) {
    for (i = 0; i < boardLength; i++) {
        var newKid1 = document.createElement('div');
        //add classes and data-
        newKid1.classList.add(`row${index + 1}`)
        newKid1.classList.add(`col${i + 1}`)
        newKid1.dataset.row = index + 1;
        newKid1.dataset.col = i + 1
         cols[i].appendChild(newKid1)
    }
}
//create 5 arrays [[1...15][16...30][31-45]....], these will be the options for numbers for each colomn on the board
optionsArr=Array.from(Array(boardWidth).keys());
ops1= Array.from(Array(numPerCol).keys());
ops1=ops1.map(item=>++item);
for(i in optionsArr){
    optionsArr[i]=ops1.map(item=>15*i+item)
}


// var optionsArr=[];
// var counter = 1;
// for (i = 0; i < boardWidth; i++) {
//     colArr = [];
//     for (j = 0; j < numPerCol; j++) {
//         colArr.push(counter);
//         counter++;
//     }
//     optionsArr.push(colArr);
// }
//for every colomn, select 5 numbers from the 15 availabe to it and add to the board
for (i =0;i<cols.length;i++) {
    colPointer = cols[i]
    numPointer = cols[i].querySelector('div')
    for (j = 0; j < boardLength; j++) {
        num = optionsArr[i].splice(Math.floor(Math.random() * optionsArr[i].length), 1)
        numPointer.innerHTML = num;
        numPointer.dataset.index = num;
        numPointer = numPointer.nextSibling;
    }
}

//create number pool to draw from
//create [0...74]
drawPool= Array.from(Array(poolSize).keys());
//+1 to each [1...75]
drawPool=drawPool.map(item=>++item);

console.log(drawPool);
//drawPool = [];
// for (i = 1; i <= poolSize; i++) {
//     drawPool.push(i);
// }

//select the target for listing the drawn numbers
var drawn = document.querySelector('.drawnNums')

//add event listener to button
//event listner on the button that draws numbers. the event handler will 
//draw a number from the pool, look for it on the board, if it finds it- check for bingo

btn = document.querySelector('.numBtn')
btn.addEventListener('click', drawNum);
function drawNum() {
    //draw 1 number from a random index in the drawPool
    var chosen = drawPool.splice(Math.floor(Math.random() * drawPool.length), 1)
    //add that number to the list of drawn numbers
    drawn.innerHTML += chosen + ", ";
    //look for chosen in its target colomn
    //if found, change background color by adding class 'gotIt'

    //finds in what colomn to look for the drawn number
    var mySpan = Math.ceil(chosen / numPerCol);
    //will traverse that colomn to search for the drawn number
    myBox = document.querySelector(`.colHd${mySpan} div`);
    while (myBox) {
        if (myBox.dataset.index == chosen) {
            myBox.classList.toggle("gotIt");
            checkBingo(myBox);
            myBox = null;
        }
        else {
            myBox = myBox.nextSibling;
        }
    }

    function checkBingo(box) {
        //this function checks the row and colomn of the matched box, print 'bingo' if all the boxes in that row/colomn have already been matched
        thisCol = document.querySelectorAll(`.col${box.dataset.col}`);
        thisRow = document.querySelectorAll(`.row${box.dataset.row}`);
        thisColArr = Array.from(thisCol);
        thisRowArr = Array.from(thisRow);
        if (thisColArr.every(item => item.classList.contains('gotIt') === true)) {
            console.log('col bingo!')
        }
        if (thisRowArr.every(item => item.classList.contains('gotIt') === true)) {
            console.log('row bingo!')
        }


    }

}

