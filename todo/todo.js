const textArea = document.querySelector("input");

const button = document.querySelector("button");
button.addEventListener("click", addTodo);

let elements = [];

function addTodo() {
    
    const text = textArea.value;
    
    if(elements.indexOf(text) == -1) {
        elements.push(text);
        let ul = document.querySelector("ul");

        let element = document.createElement("li");
        element.innerText = text;

        ul.appendChild(element);
    }
}

