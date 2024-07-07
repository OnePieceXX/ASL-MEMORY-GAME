let star= document.querySelector(".control-buttons .star");
let container=document.querySelector(".memory-game-blocks")
let WinT=false;
let level=document.querySelector(".select")
let alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let alphabetTable=Array.from(alphabet)
let alphabetTable2=[]
let Index=0
let triesElement=document.querySelector(".tries span")
let btnAgain1=document.querySelector(".Win .btn-Again")
btnAgain1.addEventListener("click",function(){
    location.reload();
})
let btnAgain2=document.querySelector(".lose .btn-Again")
btnAgain2.addEventListener("click",function(){
    location.reload();
})
star.onclick=function(){
    let name=prompt("Enter You Name!")
    if(name==null || name==""){
        document.querySelector(".info-container .name span").innerHTML="Played";
    }else{
        document.querySelector(".info-container .name span").innerHTML=name;
    }
    document.querySelector(".backround").play()
    if(level.value=="hard"){
         Index=10;
    }
    else{
         Index=5;
    }
    console.log("index number is ",Index)
    while(Index>0){
        let randomIndex=Math.floor(Math.random()*alphabetTable.length)
        let randomLetter=alphabetTable[randomIndex]
        alphabetTable2.push(randomLetter)
        alphabetTable.splice(randomIndex,1)
        Index--;
    }
    for (let i=0;i<alphabetTable2.length;i++){
        let game_Block1=document.createElement("div")
        let front1=document.createElement("div")
        let back1=document.createElement("div")
        game_Block1.classList.add("game-block")
        game_Block1.setAttribute("data-technology",alphabetTable2[i].toLowerCase())
        front1.classList.add("front","face")
        front1.append("?")
        back1.classList.add("back","face","a")
        back1.append(alphabetTable2[i].toUpperCase())
        game_Block1.append(front1,back1)
        container.append(game_Block1)
    
        let game_Block2=document.createElement("div")
        let front2=document.createElement("div")
        let back2=document.createElement("div")
        let img=document.createElement("img")
        game_Block2.classList.add("game-block")
        game_Block2.setAttribute("data-technology",alphabetTable2[i].toLowerCase())
        front2.classList.add("front","face")
        front2.append("?")
        back2.classList.add("back","face")
        img.src=`photos/${alphabetTable2[i].toLowerCase()} hand.png`
        back2.appendChild(img)
        game_Block2.append(front2,back2)
        container.append(game_Block2)
    }
    let Blocks= document.querySelectorAll(".game-block");
    let orderRange=[...Array(Blocks.length).keys()]
    Shuffle(orderRange)
    Blocks.forEach(function(ele,index){
       ele.style.order=orderRange[index]
       ele.addEventListener("click",function(){
          AddFlipped(ele)
          Win()
        })
    })
    document.querySelector(".control-buttons").remove();
    let palytimerS=document.querySelector(".timer .s2")
    let palytimerM=document.querySelector(".timer .s1")
    let conter=setInterval(function(){
        if(WinT){
            clearInterval(conter);
            document.querySelector(".Win .d3 span").innerHTML=palytimerM.innerHTML+" : "+palytimerS.innerHTML;
            palytimerS.classList.remove("danger")
            document.querySelector(".win").play()
        }
        palytimerS.innerHTML=parseInt(palytimerS.innerHTML)+1;
        if(parseInt(palytimerS.innerHTML)==60){
        palytimerS.innerHTML="00";
        palytimerM.innerHTML=parseInt(palytimerM.innerHTML)+1;
        if(parseInt(palytimerM.innerHTML)==2){
            palytimerS.classList.remove("danger")
            let lose=document.querySelector(".lose")
            let loseSpan=document.querySelector(".lose .d2 span")
            loseSpan.innerHTML=parseInt(triesElement.innerHTML)
            document.querySelector(".bi").style.display="none"
            setTimeout(function(){
                lose.style.display="block";
                lose.style.opacity=1
                document.querySelector(".memory-game-blocks").remove()
                document.querySelector(".info-container").remove()
                document.querySelector(".gameover").play()
                document.body.style.background="#8dc6ff";
                document.querySelector(".backround").pause()
            },1500)
            clearInterval(conter)
         }
        }
        if(parseInt(palytimerM.innerHTML)==1 && parseInt(palytimerS.innerHTML)==50){
            palytimerS.classList.add("danger")
            document.querySelector(".timer").classList.add("timer2")
         }
     },1000)
     
function Shuffle(array){
    let Current=array.length,
    temp,
    random;
    while(Current>0){
        random=Math.floor(Math.random()*Current)
        Current--;
        temp=array[Current];
        array[Current]=array[random];
        array[random]=temp;
    }
 return array
}

function AddFlipped(ele){
    ele.classList.add("flipped")
    let flippedBlocks=document.querySelectorAll(".flipped")
    if(flippedBlocks.length==2){
       StopCliking();
       CheckMatchedBlocks(flippedBlocks[0],flippedBlocks[1])
    }
}

let duration=1000;
function StopCliking(){
    document.querySelector(".memory-game-blocks").classList.add("no-cliking")
    setTimeout(function(){
      document.querySelector(".memory-game-blocks").classList.remove("no-cliking")
    },duration)
}
function CheckMatchedBlocks(FirestBlock,SecondBlock){
    if(FirestBlock.dataset.technology==SecondBlock.dataset.technology){
        FirestBlock.classList.remove("flipped")
        SecondBlock.classList.remove("flipped")
        FirestBlock.classList.add("matched")
        SecondBlock.classList.add("matched")
        setTimeout(function(){
            document.querySelector(".succes").play()
      },500)
    }
    else{
        triesElement.innerHTML=parseInt(triesElement.innerHTML)+1;
        setTimeout(function(){
            document.querySelector(".fail").play()
      },700)
        setTimeout(function(){
            FirestBlock.classList.remove("flipped")
            SecondBlock.classList.remove("flipped")
      },duration)
    }
}
function Win(){
     let flippedBlocks=document.querySelectorAll(".matched");
     console.log("lise")
     let GimeOver=document.querySelector(".Win");
     let GimeOverSpan=document.querySelector(".Win .d2 span")
     if(flippedBlocks.length==Blocks.length){
         let triesElement=document.querySelector(".tries span")
         GimeOverSpan.innerHTML=parseInt(triesElement.innerHTML)
         setTimeout(function(){
            GimeOver.style.display="block";
            GimeOver.style.opacity=1
            document.body.style.background="#8dc6ff";
            document.querySelector(".memory-game-blocks").remove()
            document.querySelector(".info-container").remove()
            document.querySelector(".backround").pause()
            document.querySelector(".bi").style.display="none"
         },1500)
         WinT=true;
     }
}
}
document.querySelector(".bi-volume-up").onclick=function(){
    document.querySelector(".backround").pause();
    document.querySelector(".bi-volume-up").style.display="none"
    document.querySelector(".bi-volume-mute").style.display="block"
}
document.querySelector(".bi-volume-mute").onclick=function(){
    document.querySelector(".backround").play();
    document.querySelector(".bi-volume-mute").style.display="none"
    document.querySelector(".bi-volume-up").style.display="block"
}
document.querySelector(".bi-music-note-list").onclick=function(){
    document.querySelector(".succes").volume=0
    document.querySelector(".fail").volume=0
    document.querySelector(".gameover").volume=0
    document.querySelector(".win").volume=0
    document.querySelector(".bi-music-note-list").style.display="none"
    document.querySelector(".bi-music-note").style.display="block"
}
document.querySelector(".bi-music-note").onclick=function(){
    document.querySelector(".succes").volume=1
    document.querySelector(".fail").volume=1
    document.querySelector(".gameover").volume=1
    document.querySelector(".win").volume=1
    document.querySelector(".bi-music-note").style.display="none"
    document.querySelector(".bi-music-note-list").style.display="block"
}
