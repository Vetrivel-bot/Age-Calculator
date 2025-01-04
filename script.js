let cDD = document.getElementById("cDD");
let cMM = document.getElementById("cMM");
let cYY = document.getElementById("cYY");
let Bok = document.getElementById("btn1");
let DD = document.getElementById("DD");
let MM = document.getElementById("MM");
let YY = document.getElementById("YY");
let DDc = false;
let MMc = false;
let YYc = false;
var days=31;
const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1; 
const year = today.getFullYear();
let clicked = false;
function MMCheck(){
    DDCheck;YYCheck;
    normalcolor();
    document.getElementById("error2").innerText="";
    let TMM = Number(MM.value); 
    let TYY = Number(YY.value);
    if(TMM===0){
        if(clicked){
            document.getElementById("error2").innerText="This field is required";
            errorcolor();
            return;
        }
        document.getElementById("error2").innerText="";
        return; 
    } 

    if (TMM === 8) {
       // console.log("August");
        days = 31;
        MMc = true;
        document.getElementById("error2").innerText="";
    } else if (TMM === 2) {
        if (TYY % 4 === 0 && (TYY % 100 !== 0 || TYY % 400 === 0)) {
            days = 29;
            MMc = true; 
            document.getElementById("error2").innerText="";
        } else {
            days = 28;
            MMc = true; 
            document.getElementById("error2").innerText="";
        }
    } else if ([4, 6, 9, 11].includes(TMM)) {
        days = 30;
        MMc = true; 
        document.getElementById("error2").innerText="";
    } else if (TMM <= 12) {
        days = 31;
        MMc = true; 
        document.getElementById("error2").innerText="";
    } else {
       // console.log("Invalid month");
        days = 0;
        errorcolor();
        MMc = false;
        document.getElementById("error2").innerText="Must be a valid month";
    }
    
}

function DDCheck(){
    MMCheck;YYCheck;
    normalcolor();
    document.getElementById("error1").innerText="";
    let TDD = Number(DD.value); 
    if(TDD!==0){
    if(TDD>=1 && TDD<=days){
        DDc=true;
        document.getElementById("error1").innerText="";
        console.log("ok");
    }
    else{
        DDc=false;
        errorcolor();
        if(TDD<=31)
            document.getElementById("error1").innerText="Must be a valid date";
        else
            document.getElementById("error1").innerText="Must be a valid day";
        
        //console.log("NO");
    }
}
    else{
        if(clicked)    
            document.getElementById("error1").innerText="This field is required";
            errorcolor();
    }
}


function YYCheck(){
    MMCheck;DDCheck;
    normalcolor();
    document.getElementById("error3").innerText="";
    const TYY = Number(YY.value);
    const TMM = Number(MM.value);
    const TDD = Number(DD.value);

    if (TYY >= 1920 && TYY < year) {
        //console.log("OK");
        document.getElementById("error3").innerText="";
        YYc = true;
    } else {
       // console.log("Not");
        YYc = false;
        if(TYY===0){
            document.getElementById("error3").innerText="";
            if(clicked)
           { document.getElementById("error3").innerText="This field is required";
            errorcolor();
            return;}
            return;
        }
        if(TYY<1920 && TYY>1){
            errorcolor();
            document.getElementById("error3").innerText="Too old to exist";
        }
        else  if(TYY===year){
            if(TMM===month)
               { if(TDD<date)
                    {YYc=true; 
                    return;}
                else
                    {YYc=false;
                    errorcolor();
                    document.getElementById("error1").innerText="Must be a valid date";
                    return;}
                }
            else if(TMM<month){
                YYc=true;
                return;
            }
            else{
                YYc=false;
                errorcolor();
                document.getElementById("error2").innerText="Must be a valid month";
                return;
            }
           
        }
        else{
            errorcolor();
            document.getElementById("error3").innerText="Must be in the past";
        }
            
        
    }

   

}



function ok() {
    clicked=true;
    document.getElementById("error1").innerText="";
    document.getElementById("error2").innerText="";
    document.getElementById("error3").innerText="";
    MMCheck();DDCheck();YYCheck();
    if (YYc && MMc && DDc) {
        diff(Number(DD.value), Number(MM.value), Number(YY.value));
    } else {
        //console.log("YYc:", YYc, "MMc:", MMc, "DDc:", DDc);
        cDD.innerText = "--";
        cMM.innerText = "--";
        cYY.innerText = "--";
        errorcolor();
    }
    clicked=false;
}

function diff(givenDays, givenMonths, givenYears) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are 0-indexed
    const date = today.getDate();

    let resultYears = year - givenYears;
    let resultMonths = month - givenMonths;
    let resultDays = date - givenDays;

    // Adjust months if negative
    if (resultMonths < 0) {
        resultYears--;
        resultMonths += 12;
    }

    // Adjust days if negative
    if (resultDays < 0) {
        resultMonths--;
        const lastMonth = new Date(year, month - 1, 0); // Get last day of the previous month
        resultDays += lastMonth.getDate();
    }

    // Handle edge cases for negative months after borrowing
    if (resultMonths < 0) {
        resultYears--;
        resultMonths += 12;
    }

    // Update the DOM with the results
    cDD.innerText = resultDays;
    cMM.innerText = resultMonths;
    cYY.innerText = resultYears;
}
function errorcolor(){
    console.log("done");
    let titles = document.getElementsByClassName("title");
    for (let i = 0; i < titles.length; i++) {
        titles[i].style.color = 'hsl(0, 100%, 67%)';
    } 
    let forms=document.querySelectorAll(".form input");
    for(let i=0;i<forms.length;i++){
        forms[i].style.borderColor='hsl(0, 100%, 67%)';
    }
}
function normalcolor(){
    let titles = document.getElementsByClassName("title");
    for (let i = 0; i < titles.length; i++) {
        titles[i].style.color = 'hsl(0, 1%, 44%)';
    } 
    let forms=document.querySelectorAll(".form input");
    for(let i=0;i<forms.length;i++){
        forms[i].style.borderColor='hsl(0, 1%, 44%)';
    }
}

MM.addEventListener("input", MMCheck);
YY.addEventListener("input", YYCheck);
DD.addEventListener("input",DDCheck);
Bok.addEventListener("click", ok);
