function getandupdate() {
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    currentdate = getcurrentdate();
    currenttime = getcurrenttime();
    if (tit == '') {
        window.alert("Please Enter Title");
    }
    else if (desc == '') {
        window.alert("Please Enter Description");
    }
    else {
        if (localStorage.getItem('itemsJson') == null) {
            itemJsonArray = [];
            itemJsonArray.push([tit, desc, currentdate, currenttime]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));

        }
        else {
            itemJsonArraystr = localStorage.getItem('itemsJson');
            itemJsonArray = JSON.parse(itemJsonArraystr);
            itemJsonArray.push([tit, desc, currentdate, currenttime]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        }
        update();
    }
}
function getcurrentdate(){
    let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
return today;
}
function getcurrenttime(){
    let a = new Date();
    let h = (a.getHours()<10?'0':'') + a.getHours();
    let m = (a.getMinutes()<10?'0':'') + a.getMinutes();
    let s = (a.getSeconds()<10?'0':'') + a.getSeconds();
     time = h + " : " + m + " : " + s;
    return time;
}

function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));

    }
    else {
        itemJsonArraystr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArraystr);
    }
    //populate the table
    let tablebody = document.getElementById("tablebody");
    let str = '';
    itemJsonArray.forEach((element, index) => {
        str += `
    <tr>
    <th scope="row">${index + 1}</th>
    <td>${element[0]}</td>
    <td>${element[1]}</td>
    <td>${element[2]}</td>
    <td>${element[3]}</td>
   <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
</tr> `;
    });
    tablebody.innerHTML = str;
}

add = document.getElementById("add");
add.addEventListener("click", getandupdate);
update();
function deleted(itemindex) {
    console.log("Delete", itemindex);
    itemJsonArraystr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArraystr);
    // Delete itemIndex element
    itemJsonArray.splice(itemindex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();

}

function clearstr() {
    if (confirm("Do you want to clear complete list")) {
        localStorage.clear();
        update();
    }
}
function searchkey() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablebody");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}    