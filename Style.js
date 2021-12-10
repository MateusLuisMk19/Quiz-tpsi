var winLarg = $(window).width();
var winAlt = $(window).height();
//
var i = 1,txt=0;

var questLevel;
var lvlQuest=5,numQuest=0;

var num=1;

var score=0, pts=0, respCerta=0, TimeLim=0, tempoSalvo=0;

//Sons
var correctASound = new Audio("audio/sis/right_answer.mp3")
var incorrectASound = new Audio("audio/sis/wrong_answer.mp3")
var aplauseSound = new Audio("audio/sis/aplause.mp3")
var badgameSound = new Audio("audio/sis/game_over.mp3")

//timer
var ss = 0;
var tempo = 1000; //Quantos milesimos valem 1 segundo
var cont;

function startTime(){
	cont = setInterval(() => { timer(); }, tempo);
}

function pauseTime(){
	clearInterval(cont);
}

function stopTime(){
	clearInterval(cont);
	ss = 0;
	$("#timer").html("0:00");
}

function timer(){
	
	ss++;
	
	if((TimeLim-ss) <= 5){
		$("#timer").css({"color":"red"})
	}else{
		$("#timer").css({"color":"black"})
	}
	
	if(ss == TimeLim){
		opcaoEsc(5);
	}
	
	var format = '0' + ':' + (ss < 10 ? '0' + ss : ss);
	$("#timer").html(format);
}

function temp(correct){
	pauseTime();
	
	if(correct){
		tempoSalvo += TimeLim-ss;	
	}
	
	setTimeout(function () {
		stopTime()
	}, 200);
		
}

//

function opcaoEsc(opEsc){
	
	$("#score").show();
	var correct = questLevel[numQuest].correctAnswer;
	
	if(opEsc == correct){
		//alert("correct")
		correctASound.play();
		temp(true);
		score += pts;
		respCerta++;
		ptSign(numQuest+1,true);
		
		$("#pts").html(score);
		
		$("#opcao"+opEsc).css({"background-color":"green"});
	}else if(opEsc != correct){
		temp(false);
		incorrectASound.play();
		ptSign(numQuest+1,false);
		
		$("#pts").html(score);
		$("#opcao"+opEsc).css({"background-color":"red"})
		$("#opcao"+questLevel[numQuest].correctAnswer).css({"background-color":"green"});
		
	}
	
	//numQuestAux++;
	numQuest++;
	if(numQuest>=5){
		lvlQuest++;
		numQuest=0
	}
	
	setTimeout(function () {
		play();
	}, 200);
}

function play(){
	
	$("#opcao1").css({"background-color":"#F7E6E7"})
	$("#opcao2").css({"background-color":"#F7E6E7"})
	$("#opcao3").css({"background-color":"#F7E6E7"})
	$("#opcao4").css({"background-color":"#F7E6E7"})
	 
	switch(lvlQuest){
		case 1: 
			if(numQuest==0){
				ptSign(10,null);	
			}
			$("#nivel").html(" Nivel 1 ")
			questLevel = myQuestionarioN1;
			pts=2;
			TimeLim = 30;
			$("#limitTim").html("* 00:"+TimeLim+" *");
			construir(questLevel,numQuest);
			break;
		case 2: 
			if(numQuest==0){
				ptSign(10,null);
			}
			
			$("#nivel").html(" Nivel 2 ")
			questLevel = myQuestionarioN2;
			pts=4;
			TimeLim = 25;
			$("#limitTim").html("* 00:"+TimeLim+" *");
			construir(questLevel,numQuest);
			
			break;
		case 3: 
			if(numQuest==0){
				ptSign(10,null);
			}
			
			$("#nivel").html(" Nivel 3 ")
			questLevel = myQuestionarioN3;
			pts=6;
			TimeLim = 20;
			$("#limitTim").html("* 00:"+TimeLim+" *");
			construir(questLevel,numQuest);
			
			break;
		case 4:
			if(numQuest==0){
				ptSign(10,null);	
			}
			
			$("#nivel").html(" Nivel 4 ")
			questLevel = myQuestionarioN4;
			pts=8;
			TimeLim = 10;
			$("#limitTim").html("* 00:"+TimeLim+" *");
			construir(questLevel,numQuest);
			
			break;
		default: telaFinal();
			break;
	}
	startTime();
}
//controi a pergunta com as opções, recebe o nivel da questão à apresentar(questLevel) e o numero da pergunta (nQ)
function construir(Quest,nQ){

	var audio = Quest[nQ].audio;
	var image = Quest[nQ].img;

	if(Quest[nQ].mid){

		$("#midia").show();
		if(Quest[nQ].audio != ""){
			$("#pergunta").html("<br>" + Quest[nQ].question);
			$("audio").show();
			$("#imgmidia").hide();
			$("#btnVid").hide();
			$("audio").attr({"src":audio})
		}else if(Quest[nQ].video != ""){
			$("#pergunta").html("<br>" + Quest[nQ].question + "<br><br>");
			$("audio").hide();	
			$("#imgmidia").hide();
			$("#btnVid").show();
		}else if(Quest[nQ].img != ""){
			$("#pergunta").html(Quest[nQ].question);
			$("#pergunta").css({"font-size":26});
			$("audio").hide();	
			$("#imgmidia").show();
			$("#btnVid").hide();
			$("#imgmidia").attr({"src":image})
		}
	}
	else{
		$("#midia").hide();
		$("audio").hide();
		$("#pergunta").html("<br><br>" + Quest[nQ].question);
	}

	$("#opcao1").html(Quest[nQ].answers.a);
	$("#opcao2").html(Quest[nQ].answers.b);
	$("#opcao3").html(Quest[nQ].answers.c);
	$("#opcao4").html(Quest[nQ].answers.d);

	}

$(document).ready( function() {
	
	random();
	
	//$("#score").hide();
	$("#present").hide();
	$("#midia").hide();
	$("audio").hide();
	$("#telaFinal").hide();
	
	
	$("#quiz").css({"width":winLarg-winLarg/2, "height":winAlt-(winAlt/2)});
	$(".marquee").css({"width":winLarg-510, "height":winAlt/25,"margin-left":winLarg/6.44})
	$(".resposta").css({"width":winLarg/4-25})
	$("#score").css({"margin-right":winLarg/6,"width":100})
	$("#present").css({"width":winLarg, "height":winAlt-(winAlt/2.2)});
	$("#telaFinal").css({"width":winLarg-winLarg/2, "height":winAlt-(winAlt/2)});
	
	play();
	
})

function showMid(whatMid){ //1 para imagem, 2 para video
	$("#quiz").hide();
	$("#score").hide();
	$(".marquee").hide();
	$("#present").show();
	var video = questLevel[numQuest].video;
	var img =questLevel[numQuest].img;
	
	if(whatMid==1){
		$("video").hide();
		$("#imgpresent").show();
		$("#imgpresent").attr({"src":img})
		$("#imgpresent").css({"height":$("#present").height()})
	}
	if(whatMid==2){
		$("video").show();
		$("#imgpresent").hide();
		$("video").attr({"src":video,"height":$("#present").height()})
	}
}

function unShowMid(){
	$("#quiz").show();
	$("#score").show();
	$(".marquee").show();
	$("#present").hide();
	
}

function telaFinal(){
	temp(false);
	
	stopTime();
	$("#quiz").hide();
	$("#score").hide();
	$(".marquee").hide();
	$("#telaFinal").show();
	$("#telf").show();
	$(".telaFinal").show();
	
	var med = medalha();
	
	$("h1.telaFinal").html("Parabens por chegar ao fim do nosso Quiz!!!");
	
	if(score<50){
		badgameSound.play();
		$("h2.telaFinal").html("Precisa de ver mais filmes. Boa sorte para proxima")
		if(score<30){
			$("h2.telaFinal").html("Desempenho muito fraco!")
		}
	}
	else if(score>=50 && score<80){
		aplauseSound.play();
		$("h2.telaFinal").html("Você é bom, só precisa de mais umas afinadelas")
	}
	else{
		aplauseSound.play();
		$("h2.telaFinal").html("Impressionante!")
	}
	
	$("h4.telaFinal").html("Respondeu corretamente a " + respCerta + " de 20 perguntas e somou <br>" + score + " de 100 Pontos<br>Conseguiu mais " + tempoSalvo + " pontos devido á rapidez nas respostas <br>")
	
	var total = score+tempoSalvo;
	
	$("h3.telaFinal").html("Total de Pontos: " + total)
}

function medalha(){
	var medal = "";
	var classif;
	
	if(score > 0 && score <= 30){
		medal = medalhaLvl[0];
		//alert(medal);
		$("#telf").attr({"src":medal});
		classif = "Merito"
	}
	else if(score > 30 && score < 50){
		medal = medalhaLvl[1];
		//alert(medal);
		$("#telf").attr({"src":medal});
		classif = "Bronze"
	}
	else if(score > 50 && score <= 80){
		medal = medalhaLvl[2];
		//alert(medal);
		$("#telf").attr({"src":medal});
		classif = "Prata"
	}
	else if(score > 80){
		medal = medalhaLvl[3];
		//alert(medal);
		$("#telf").attr({"src":medal});
		classif = "Ouro"
	}
	
	return classif;	
}

function recomecar(){
	
	//esconder elementos
	$("#present").hide();
	$("#midia").hide();
	$("audio").hide();
	$("#telaFinal").hide();
	
	$("#quiz").show();
	$(".marquee").show();
	$("#score").show();
	//resetar variaveis
	lvlQuest=1;
	numQuest=0; 
	score=0; 
	pts=0; 
	respCerta=0;
	
	$("#pts").html(score);
	
	random();
	play();
}

function random(){
	shuffle(myQuestionarioN1);
	//shuffle(myQuestionarioN2);*/
	shuffle(myQuestionarioN3);
	//shuffle(myQuestionarioN4);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while(0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

	//referencia: https://qastack.com.br/programming/2450954/how-to-randomize-shuffle-a-javascript-array
}

function ptSign(ptn, correct){
	if(correct){
		$("#pt"+ptn).css("background-color","green")	
	}else{
		$("#pt"+ptn).css("background-color","red")
	}
	
	if(ptn==10){
		$("#pt1").css("background-color","white")
		$("#pt2").css("background-color","white")
		$("#pt3").css("background-color","white")
		$("#pt4").css("background-color","white")
		$("#pt5").css("background-color","white")
	}
}

/* ***************************** */
function vazio(){
	recomecar();
	opcaoEsc();
	unShowMid();
	showMid();
}

