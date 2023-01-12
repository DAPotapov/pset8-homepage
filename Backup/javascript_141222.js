// Functions for services page (services.html)
// var element = document.querySelectorAll('.quantity');
// element.addEventListener('change', inputcontrol());
//
// function inputcontrol(){
//         console.log("It's working");
// }

function calculateSum(){

//     TODO должна быть проверка/возможность ввода только цифр (regex?)
    var positions = document.querySelectorAll('.quantity');
    var len = positions.length;
    var totalSum = 0;
    var cost = document.querySelectorAll('.cost');
    for (let i = 0; i < len; i++) {
        if (positions[i].value != '') {
            totalSum = totalSum + parseInt(positions[i].value) * parseInt(cost[i].innerHTML);
        }
    }
    var ttlSumField = document.getElementById("totalSum");
    ttlSumField.value = totalSum;
    ttlSumField.innerHTML = totalSum;
    if (ttlSumField.innerHTML != "" && ttlSumField.innerHTML != "0" && totalSum > 0){
        document.getElementById("orderNow").removeAttribute('disabled', '');
    }
    else {
        document.getElementById("orderNow").setAttribute('disabled', '');
    }
}

function order(){
    document.getElementById("creditcard").removeAttribute('hidden', '');
//     console.log("Nothing");
}

function validation(){
    // Preparations: Remove cardname if any on start
    var cardlogo = document.getElementById("cardlogo");
    document.getElementById('nonvalid').setAttribute('hidden', '');
    document.getElementById('thanks').setAttribute('hidden', '');
    while (cardlogo.lastChild)
    {
        cardlogo.removeChild(cardlogo.lastChild);
    }

    if (document.getElementById("cardlogo").childElementCount > 0) {
        document.getElementById("cardlogo").children.remove;
    }

    var numberInput = document.getElementById("card_number-input").value;
    // Lets control that user don't input anything besides numbers and space (it's ok - I'll get rid of it later)
    var pattern = /[^ 0-9]/;
    // It's true if there are anything except digits and space
    if (pattern.test(numberInput)){
        document.getElementById('nonvalid').removeAttribute('hidden');
    }

        // Clear string from spaces
    numberInput = numberInput.replace(/\s+/g, '');
    var n = numberInput.length;

    // Once 2 digits of number is written start checking which bank system card belongs
    if (n > 1) {
        var textnode = document.createTextNode('');
        if (numberInput.startsWith('2')) {
            textnode.nodeValue = 'MIR';
        }
        if (numberInput.startsWith('4')) {
            textnode.nodeValue = 'VISA';
        }
        if (/^3[47]/.test(numberInput)) {
            textnode.nodeValue = 'AMEX';
        }
        if (/^5[1-5]/.test(numberInput)) {
            textnode.nodeValue = 'MASTERCARD';
        }
        // Add cardname only if it has one
        if (textnode.nodeValue != '')
        {
            var cardname = document.createElement('p');
            cardname.appendChild(textnode);
            document.getElementById("cardlogo").appendChild(cardname);
        }
    }


    // When it is long enough lets validate it, maybe TODO from here https://attacomsian.com/blog/javascript-detect-user-stops-typing
    if (n > 12) {
        // Assume that card number max length is limited 16 digits. We can scale it later if needed.
        var zeros = '0';
        for (let i = 1; i < 16 - n; i++){
            zeros = zeros + '0';
        }
        var cardnumber = zeros + numberInput;
        console.log(cardnumber);
        if (validate(cardnumber)){
             // button buy
            document.getElementById("buybtn").removeAttribute('disabled', '');
        }
        else{
            // плашка invalid
            document.getElementById("buybtn").setAttribute('disabled', '');
        }
//     console.log(numberInput);
    }
}

function validate(cardnumber){
    var summa = 0;
    var sumproduct = 0;
    var digit = 0;
    var n = cardnumber.length;
    // Go through digits in card number and do math
    for (let i = n - 1; i > 0; i = i - 2){
        digit = parseInt(cardnumber[i - 1]) * 2;
        if (digit > 9) {
            digit = ~~(digit / 10) + digit % 10;
        }
        sumproduct += digit;
        summa += parseInt(cardnumber[i]);
    }
        //# Provide output based on math above
    if ((summa + sumproduct) % 10 == 0){
        return true;
    }
    else{
        return false;
    }
}

function payment(){
    document.getElementById("thanks").removeAttribute('hidden', '');
    // This one-string function made as standalone on purpose: In real world here will be more sophisticated function to process transaction
}

// Functions for About page (contacts.html)
function hasComment(){
    var text = document.getElementById("commentInput").value;
    if (text.length > 0){
        document.getElementById("addCommentBtn").removeAttribute('disabled', '');
    }
}

function enterHit(event){
    if (event.key == "Enter" && document.getElementById("commentInput").value.length > 0)
    {
        addComment();
    }
}

function addComment(){
    var author = document.getElementById("commentAuthor").value;
    // Only proceed if author field is not empty
    if (author == "")
    {
        document.getElementById("commentAuthor").placeholder = "Anonimous posts are not allowed!";
        document.getElementById("commentAuthor").style.background = "#ff9999";
    }
    else {
        var node = document.createElement("p");/* TODO which element I should add for comments?*/
        var textnode = document.createTextNode(document.getElementById("commentInput").value);
        var par = document.createElement("p");
        par.appendChild(textnode);
        node.appendChild(par);
        var signature = document.createTextNode(document.getElementById("commentAuthor").value + ', ' + new Date());
        var par = document.createElement("p");
        par.appendChild(signature);
        par.setAttribute('style', 'text-align:right;font-style:italic');
// TODO оформить комменты в рамочку для этого найти соответствующий класс в бутстрапе
        node.appendChild(par);
        const list = document.getElementById("comments");
        list.insertBefore(node, list.children[0]);
        // clear contents of input boxes
        document.getElementById("commentAuthor").value = "";
        document.getElementById("commentInput").value = "";
    }
}


// TICTACTOE page

function playgame(){
    // Cleaning
    var field = document.getElementById('field');
    while (field.lastChild)
    {
        field.removeChild(field.lastChild);
    }

    // Making playfield
    var id;
    var n = 3;
    const tabl = document.getElementById('field');
    for (i = 0; i < n; i++){
        let row = document.createElement('tr');
        for (j = 0; j < n; j++){
            let col = document.createElement('td');
            id = (i + 1) + '' + (j + 1);
            col.setAttribute('id', id);
            col.setAttribute('onclick', 'game(id)');
         //   col.setAttribute('style', 'text-align: center'); //font-size: 3em;
            col.setAttribute('class', 'gamecell');
            row.appendChild(col);
        }
        row.setAttribute('id', i + 1);
        tabl.appendChild(row);
    }
    document.getElementById('play').innerHTML = 'PLAY AGAIN!';

    // Game
}

function game(id){
    document.getElementById('msgs').innerHTML = '';
    var cell = document.getElementById(id);
    let temp = cell.innerHTML;
    var x = document.createElement('h1')
    if (cell.innerHTML == ''){
        x.innerHTML = "X";
       // x.setAttribute('style', 'text-align: center; color: var(--bs-blue');
        x.style.color = 'var(--bs-blue)';
        x.style.textAlign = 'center';
        cell.appendChild(x);
        // TODO и здесь же ход противника
        // If center cell is not occupied then place O there
        var o = document.createElement('h1');
        o.innerHTML = 'O';
        o.style.color = 'var(--bs-red)';
        o.style.textAlign = 'center';
        cell = document.getElementById('22');
        if (cell.innerHTML == ''){
            cell.appendChild(o);
        }
        else{
            var cells = document.querySelectorAll('.gamecell');
            var xwin = false;
            var owin = false;
            var freespots = 0;
            var freecells = [];
            for (cell of cells){
                if (cell.innerHTML == ''){
                    freecells[freespots] = cell.id;
                    freespots++;
                }
                else{
                    if (/X/.test(cell.innerHTML)){
                        xcount++; // TODO 3x должны быть в ряд - т.е. здесь проверяем условие победы, чтобы дальше её объявить. т.е. проверяем ячейки рядом
                        xwin = true;
                    }
                    else if (/O/.test(cell.innerHTML)){
                        ocount++;
                        owin = true;
                    }
                }
            }
            if (xwin == true){
                document.getElementById('msgs').innerHTML = 'GAME OVER! X wins!';
            }
            else if (owin == true){
                document.getElementById('msgs').innerHTML = 'GAME OVER! O wins!';
            }
            else if (freespots == 0){
                document.getElementById('msgs').innerHTML = "GAME OVER! It's a draw. НИЧЬЯ!"
            }
            else {
                 // TODO switch 2 стратегии, когда только 1 Х и когда уже 2 Х
                cell = document.getElementById(freecells[0]);
                cell.appendChild(o);

            }

            console.log(freespots);


        }

    }
    else {
        cell.style.backgroundColor = 'var(--bs-warning)';
        document.getElementById('msgs').innerHTML = 'Ячейка занята, выбери другую. Cell is occupied, choose another';
        setTimeout(function () {cell.style.backgroundColor = ''; document.getElementById('msgs').innerHTML = '' }, 1200);
    }
}
