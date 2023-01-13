// Functions for About page (contacts.html)
// $(document).ready(){
//
//
// }

function hasComment(){
    var text = document.getElementById("commentInput").value;
    if (text.length > 0){
        document.getElementById("addCommentBtn").removeAttribute('disabled', '');
    }
}

// I assume that there will be one-line comments, so let post by Enter-hit
function enterHit(event){
    if (event.key == "Enter" && document.getElementById("commentInput").value.length > 0)
    {
        addComment();
    }
}

function addComment(){
    var author = document.getElementById("commentAuthor").value;
    var text = document.getElementById("commentInput").value;
    // Only proceed if author field is not empty
    if (author == "")
    {
        document.getElementById("commentAuthor").placeholder = "Anonimous posts are not allowed!";
        document.getElementById("commentAuthor").style.background = "#ff9999";
    }
    // ..and if there are anything to post
    else if (text == ""){
        $('#commentInput').attr('placeholder', 'You should write something to post something');
        $('#commentInput').attr('style', 'background: #ff9999');
    }
    else {
        var node = document.createElement("div");
        node.setAttribute('class', 'card card-body');
        $(node).addClass('card card-body comment');
        var textnode = document.createTextNode(text);
        var par = document.createElement("p");
        $(par).addClass('card-text');
        par.appendChild(textnode);
        node.appendChild(par);
        var signature = document.createTextNode(document.getElementById("commentAuthor").value + ', ' + new Date());
        var par = document.createElement("p");
        par.appendChild(signature);
//         par.setAttribute('class', 'signature');
        $(par).addClass('signature text-muted');
        node.appendChild(par);
        const list = document.getElementById("comments");
        list.insertBefore(node, list.children[0]);
        // clear contents of input boxes
        document.getElementById("commentAuthor").value = "";
        document.getElementById("commentInput").value = "";
        $('#commentAuthor').attr('placeholder', 'Type your name');
        $('#commentAuthor').attr('style', '');
        $('#commentInput').attr('placeholder', 'Type comment here');
        $('#commentInput').attr('style', '');
    }
}
