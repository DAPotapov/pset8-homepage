
function calculateSum(){

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
        var node = document.createElement("div");
        node.setAttribute('class', 'card card-body');
        var textnode = document.createTextNode(document.getElementById("commentInput").value);
        var par = document.createElement("p");
        par.appendChild(textnode);
        node.appendChild(par);
        var signature = document.createTextNode(document.getElementById("commentAuthor").value + ', ' + new Date());
        var par = document.createElement("p");
        par.appendChild(signature);
        par.setAttribute('class', 'signature');
        node.appendChild(par);
        const list = document.getElementById("comments");
        list.insertBefore(node, list.children[0]);
        // clear contents of input boxes
        document.getElementById("commentAuthor").value = "";
        document.getElementById("commentInput").value = "";
    }
}
