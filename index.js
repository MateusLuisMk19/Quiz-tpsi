function f_welcome(){
	var x = document.getElementById("pname").value
	
	if(x == "" || x == null){
		alert("Introduza primeiro o seu nome");
	}else{
		document.getElementById("welcomename").innerHTML = cumprimentar() + x + " <br>Para Iniciar o Jogo carrega no botão"
		$(".welc").hide();
		$(".seg").show();
	}
}

function cumprimentar(){
	
	var e = new Date()
	var h = e.getHours()
	var t 
	
	if(h >= 7 && h < 12){
		t = "Bom dia, ";
		return t;
	}else if(h >= 12 && h < 19){
		t = "Boa tarde, ";
		return t;
	}else if((h >=19 && h < 24) || (h >=0 && h < 7)){
		t = "Boa noite, ";
		return t;
	} 
}

$(document).ready( function(){
	$(".seg").hide();
	
})