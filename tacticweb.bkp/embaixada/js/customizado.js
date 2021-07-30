//validação de campos e formulário
function verificaEmail(email)
{
	  var re = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/;
	  var OK = re.exec(email);
		if (!OK)
			  return false;
		else
			  return true;
}

function validaForm(){

	var campoNome  =  document.getElementById("nome").value;
	var campoFone  =  document.getElementById("fone").value;
	var campoEmail =  verificaEmail(document.getElementById("email").value);
	var campoCurso =  document.getElementById("curso").selectedIndex;
	
	var formulario =  document.getElementById('validate-form');

	//valida os campos	
	if (campoEmail && campoFone && campoEmail && campoCurso){
		
		 document.getElementById('cadastrar').style.cursor = "not-allowed";
		 document.getElementById('cadastrar').style.backgroundColor = "#396487";
		 document.getElementById('cadastrar').value = "ENVIANDO..."; 
		
		 formulario.submit();
	 }else{
		  
		  if(document.getElementById("curso").selectedIndex == 0){document.getElementById("curso").style.backgroundColor='#FFB399'}
		  if(!campoNome){document.getElementById("nome").style.backgroundColor='#FFB399'}
		  if(!campoFone){document.getElementById("fone").style.backgroundColor='#FFB399'}
		  if(!campoEmail){document.getElementById("email").style.backgroundColor='#FFB399'}
		  
		  alert('Ops! Você deixou de preencher alguma informação e/ou seu e-mail está incorreto. Verifique os campos marcados.');
		 
		  
	  }
}

function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}
function id( el ){
	return document.getElementById( el );
}
window.onload = function(){
	id('fone').onkeypress = function(){
		mascara( this, mtel );
	}
}

function apareceData(){
	 
        if( document.getElementById('datahora').style.display == 'block')
            document.getElementById('datahora').style.display = 'none';
        else
            document.getElementById('datahora').style.display = 'block';
	
}