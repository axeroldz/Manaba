(() => {
    const form = document.querySelector(".report-form").parentElement.parentElement;
    const input = document.querySelector("input[type=file]");
    const notUploaded = document.querySelector('span.deadline');
    
    const submit = ()=>{
        const hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = "action_ReportStudent_submitdone";
        hidden.value = "1";
        form.appendChild(hidden);
        form.submit();
    };

    const image =  (place) =>{
        const img = document.createElement("img");

        img.src = "https://icon-library.com/images/drag-and-drop-icon/drag-and-drop-icon-8.jpg";
        img.style.width = "auto";
        img.style.height = "75px";
        img.style.margin="auto";
        place.appendChild(img)
    }
    
    const insert = () =>{
        const newFrame = document.createElement("div");
        newFrame.style.color = "black";
        newFrame.style.textAlign = "center";
        newFrame.style.display = "border";
        image(newFrame);
        message(newFrame);
        notUploaded.appendChild(newFrame);
    }

    const message = (place) =>{
        const msg1 = document.createElement("div");
        const msg2 = document.createElement("div");
        
        msg1.textContent = "ここにファイルをドロップ";
        
        msg2.textContent = "OR";
        msg2.style.margin = "6px"
        msg2.style.fontSize = "15px"

        place.appendChild(msg1);
        place.appendChild(msg2);
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
    const edit = () =>{
        const form = document.querySelector("div.form  .report-formV2");
        const button = document.querySelector(".queryv4");

        button.title = "ここにドロップ"
        form.style.textAlign = "center";

    }
 
   if(input){
    edit();
    if(notUploaded)
        insert();
    
    addListener();
   }
})();