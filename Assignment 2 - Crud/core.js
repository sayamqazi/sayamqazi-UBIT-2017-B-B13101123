var records = [];
var numRecords = 0;
var currentMode = "add";
var editIndex  = 0 ;

function processInput() {
    var t = document.getElementById("iTitle").value;
    var a = document.getElementById("iAuthor").value;
    var b = document.getElementById("iISBN").value;
    if (t === "" || a === "" || b === "") {
        document.getElementById("errorBox").innerHTML = "A field cannot be left empty.";
        document.getElementById("outBox").style.visibility = "visible";
    }
    else {
        document.getElementById("outBox").style.visibility = "hidden";
        if (currentMode === "add")
            addRecord();
        else if (currentMode === "edit")
            submitChanges();   
    }
}

function submitChanges(idx) {
    
    records[editIndex].author = document.getElementById("iAuthor").value;
    records[editIndex].title = document.getElementById("iTitle").value;
    records[editIndex].isbn = document.getElementById("iISBN").value;
    renderRecords();
    currentMode = "add";

}

function addRecord() {
    
    var ttl = document.getElementById("iTitle").value;
    var ath = document.getElementById("iAuthor").value;
    var bkn = document.getElementById("iISBN").value;
    
    var rec = {author:"" , title:"" , isbn:""};
    rec.author = ath;
    rec.title = ttl;
    rec.isbn = bkn;
    records.push(rec);
    
    numRecords = numRecords + 1;
    renderRecords();
}

function editRecord(idx) {
    document.getElementById("iTitle").value = records[idx].title;
    document.getElementById("iAuthor").value = records[idx].author;
    document.getElementById("iISBN").value = records[idx].isbn;
    currentMode = "edit";
    editIndex = idx;
}

function deleteRecord(idx) {
    records.splice(idx,1);
    numRecords --;
    renderRecords();
}
function renderRecords() {
    
    var raw = "<tr id=\"listHead\">"+
                            "<td>Title</td>"+
                            "<td>Author</td>"+
                            "<td>ISBN</td>"+
                            "<td>Edit</td>"+
                            "<td>Delete</td>"+
                        "</tr>";
  
    for (var i = 0 ; i < records.length ; ++i) {
        raw += "<tr><td>" +
             records[i].title + 
            "</td><td>" +
             records[i].author + 
            "</td><td>" + 
             records[i].isbn + 
            "</td><td><img onclick=\"editRecord("+i+")\"src=\"icons/edit.svg\"/></td>" +
            "<td><img onclick=\"deleteRecord("+i+")\" src=\"icons/delete.svg\"/> </td></tr>";
    }
    document.getElementById("listBox").innerHTML = raw;
}
