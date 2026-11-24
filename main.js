
let copy=document.getElementById("copy")
let theme=document.getElementById("theme")
let result=document.getElementById("result")
let resultexp=document.getElementById("resultexp")
let memoryclear=document.getElementById("memoryclear")
let memoryrecall=document.getElementById("memoryrecall")
let memoryplus=document.getElementById("memoryplus")
let memoryminus=document.getElementById("memoryminus")
let openbracket=document.getElementById("openbracket")
let closebracket=document.getElementById("closebracket")
let clear=document.getElementById("clear")
let percentage=document.getElementById("percentage")
let backbracket=document.getElementById("backbracket")
let one=document.getElementById("one")
let two=document.getElementById("two")
let three=document.getElementById("three")
let four=document.getElementById("four")
let five=document.getElementById("five")
let six=document.getElementById("six")
let seven=document.getElementById("seven")
let eight=document.getElementById("eight")
let nine=document.getElementById("nine")
let dot=document.getElementById("dot")
let div=document.getElementById("div")
let mul=document.getElementById("mul")
let sub=document.getElementById("sub")
let add=document.getElementById("add")
let clearhis=document.getElementById("clearhis")
let msg=document.getElementById("msg")
let equal=document.getElementById("equal")


let memory=0
let historyarr=JSON.parse(localStorage.getItem("History")) || []


function addvalue(value){
    result.value=result.value+value
    resultexp.textContent=""
}
document.querySelectorAll(".numbersdiv button")
.forEach((btn)=>{
    let value=btn.textContent.trim()
    if(value!=="AC" && value!=="⌫" && value!=="%"){
        btn.addEventListener("click",()=>{
            addvalue(value)
        })
    }
})

clear.addEventListener("click",()=>{
    result.value=""
    resultexp.textContent=""
})

function deletelast(){
    result.value=result.value.slice(0,-1)
}
backbracket.addEventListener("click",()=>{
    deletelast()
})
percentage.addEventListener("click",()=>{
    if(result.value===""){
        result.value="Please enter a value"
        return;
    }
    let value=Number(result.value)
    let answer= value / 100
    result.value=answer
})


div.addEventListener("click",()=>{
    addvalue("/")
})
mul.addEventListener("click",()=>{
    addvalue("*")
})
sub.addEventListener("click",()=>{
    addvalue("-")
})
add.addEventListener("click",()=>{
    addvalue("+")
})

equal.addEventListener("click",()=>{
    let value=result.value
    let answer=eval(value)
    if(result.value===""){
        result.value="Please enter a number"
        return;
    }
    if(!isFinite(answer)){
        result.value="Cannot divisible by zero"
        return
    }
    value=value.replaceAll("^","**")
    result.value=answer
    resultexp.textContent=value.replaceAll("^","**").replaceAll("*","x").replaceAll("/","÷")
    historyadd(value,answer)
})


openbracket.addEventListener("click",()=>{
    addvalue("(")
})
closebracket.addEventListener("click",()=>{
    addvalue(")")
})

memoryclear.addEventListener("click",()=>{
    memory=0
    resultexp.textContent="Memory Cleared."
})
memoryrecall.addEventListener("click",()=>{
    result.value=memory
    resultexp.textContent="Memory : "+memory
})
memoryplus.addEventListener("click",()=>{
    memory=memory+Number(result.value)
    resultexp.textContent="Memory : "+memory
})
memoryminus.addEventListener("click",()=>{
    memory=memory-Number(result.value)
    resultexp.textContent="Memory : "+memory
})

document.querySelectorAll("[data-scientific]").forEach((b)=>{
    b.addEventListener("click",()=>{
        let type=b.dataset.scientific
        scientificfunc(type)
    })
})
function scientificfunc(type){
    let value=Number(result.value)
    let ans
    if(result.value.trim()===""){
        result.value="Please enter a value"
        return;
    }
    else if(type==="sin"){
        ans=Math.sin((value*Math.PI) / 180)
    }else if(type==="cos"){
        ans=Math.cos((value*Math.PI) / 180)
    }
    else if(type==="tan"){
        ans=Math.tan((value*Math.PI) / 180)
    }else if(type==="sqrt"){
        ans=Math.sqrt(value)
    }
    else if(type==="square"){
        ans=(value*value)
    }else if(type==="log"){
        ans=Math.log10(value)
    }else if(type==="ln"){
        ans=Math.log(value)
    }else if(type==="power"){
         if(result.value.trim()===""){
            result.value="Please enter a value"
            return;
        }
        result.value=result.value+"^"
        resultexp.textContent="Enter power value before calculates"
        return;
    }
    result.value=ans
    resultexp.textContent=type+"("+value+")"
    historyadd(type+"("+value+")",ans)
}

clearhis.addEventListener("click",()=>{
    historyarr=[]
    localStorage.removeItem("History")
    showhistory()
})
function historyadd(exp,ans){
   historyarr.unshift({
    expression:exp,
    answer:ans
   })
    historyarr=historyarr.slice(0,20)
    localStorage.setItem("History",JSON.stringify(historyarr))
    showhistory()
}
function showhistory(){
    let historyaddingdiv=document.getElementById("historyaddingdiv")
    historyaddingdiv.innerHTML=""
     if(historyarr.length===0){
         historyaddingdiv.innerHTML=`<p>No calculation yet</p>`
        return;
    }
    historyarr.forEach((arr)=>{
        let div=document.createElement("div")
        div.className="Historyadddiv"
        div.innerHTML=
        `<span>${arr.expression}</span>
        <span>=${arr.answer}</span><br>`

        div.addEventListener("click",()=>{
            result.value=arr.answer
            resultexp.textContent=arr.expression
        })
        historyaddingdiv.append(div)
    })
}


document.addEventListener("keydown",(e)=>{
    
    let key=e.key
    
    if(key>="0" && key<="9"){
        addvalue(key)
    }
    else if(key==="+" || key==="-" || key==="*" || key==="/"){
        addvalue(key)
    }
    else if(key==="."){
        addvalue(key)
    }
    else if(key==="(" || key===")"){
        addvalue(key)
    }
    else if(key==="Enter" || key==="="){
        e.preventDefault()
        equal.click()
    }
    else if(key==="Backspace"){
        deletelast()
    }
    else if(key==="Escape"){
        clear.click()
    }
    
})

copy.addEventListener("click",()=>{
    if(result.value===""){
        return;
    }
    copy.classList.toggle("ri-file-copy-line")
    copy.classList.toggle("ri-check-line")
    setTimeout(()=>{
        copy.classList.toggle("ri-file-copy-line")
        copy.classList.toggle("ri-check-line")
    },5000)
    navigator.clipboard.writeText(result.value)
})


theme.addEventListener("click",()=>{
    theme.classList.toggle("ri-moon-line")
    theme.classList.toggle("ri-sun-line")
    document.body.classList.toggle("dark")
})
    showhistory()
