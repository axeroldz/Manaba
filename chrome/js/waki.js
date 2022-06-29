let body = document.querySelector("body");
let selectarea = document.querySelector(".showmore");
let selectcourse = document.getElementsByName("select");
let addElement = document.createElement("select");
addElement.innerHTML = "<option>1Q</option> <option>2Q</option> <option>3Q</option> <option>4Q</option>";
console.log(selectarea);
console.log(selectcourse[0]);
selectarea.insertBefore(addElement, selectcourse[0]);