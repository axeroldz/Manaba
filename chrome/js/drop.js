(() => {
    const form = document.querySelector(".report-form").parentElement.parentElement;
    const input = document.querySelector("input[type=file]");
    
    const submit = ()=>{
        const hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = "action_ReportStudent_submitdone";
        hidden.value = "1";
        form.appendChild(hidden);
        form.submit();
    };
    const insertDropMessage = () =>{
        const message = document.createElement("div");
        message.setAttribute("id", "drop-state");
        message.innerHTML = "<p>またはここにファイルをドロップ</p>";
        input.parentElement.parentElement.appendChild(message);
    }

    const addListener = () =>{
        form.addEventListener("dragover", event => {
            event.preventDefault(),form.parentElement.style.backgroundColor = "#d7e2fc";
        });

        form.addEventListener("dragleave", () =>{
           form.parentElement.style.backgroundColor = "";
        });
        
        form.addEventListener("drop", event=> {
            event.preventDefault();
            input.files = event.dataTransfer.files;
            submit();
        });
    };
 
   if(input){
    insertDropMessage();
    addListener();
   }
})();