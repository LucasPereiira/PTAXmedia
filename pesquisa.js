const date = new Date();
const dia = date.getDate();
const mes = date.getMonth() + 1;
const ano = date.getFullYear();

const diaAnterior = date.getDate() - 1;
// const dataAtual = "'"+mes + "-"+ dia+ "-"+  ano+"'"; 
// const dataInicioMes = "'"+mes + "-"+ (dia - diaAnterior) + "-"+  ano+"'";

var botoes = document.querySelectorAll(".flex button"); // Seleciona todos os botões

for (var i = 0; i < botoes.length; i++) {
    if (botoes[i].classList.contains("bg-black")) {
        var anoSelecionado = botoes[i].textContent.trim();
        break; // Para o loop após encontrar o selecionado
    }
}

const dataAtual = "'"+mes + "-"+ dia+ "-"+  anoSelecionado+"'"; 
        
const dataInicioMes = "'"+mes + "-"+ (dia - diaAnterior) + "-"+  anoSelecionado+"'"

var urlAnoTodo = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='01-01-2025'&@dataFinalCotacao=${dataAtual}&$top=1000&$format=json&$select=cotacaoVenda,dataHoraCotacao`

var urlMesTodo =`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial=${dataInicioMes}&@dataFinalCotacao=${dataAtual}&$top=1000&$format=json&$select=cotacaoVenda,dataHoraCotacao`


var xhttp = new XMLHttpRequest();
var xhttp1 = new XMLHttpRequest();
var xhttpAno = new XMLHttpRequest();

var valorDia = document.querySelector('#valorDia');
var dataDia = document.querySelector('#dataDia')
var listValores = document.querySelector('#listPTAX')

function formatDat(date){
    
    const formatData = [];

    const dat = date.split('')
    formatData.push(date[8]);
    formatData.push(date[9]);
    formatData.push("/");
    formatData.push(date[5]);
    formatData.push(date[6]);

    const dataCorreta = formatData.join('');

    return dataCorreta;
}

xhttp1.open("GET", urlMesTodo, true);

xhttp1.onreadystatechange = function(){//Função a ser chamada quando a requisição retornar do servidor
    if ( xhttp1.readyState == 4 && xhttp1.status == 200 ) {//Verifica se o retorno do servidor deu certo
        const result = JSON.parse(xhttp1.response) //Passa o retorno para JSON      
        //console.log(result.value);
        const length = result.value.length - 1; //Pega o tamanho do Json menos um
        valorDia.append(result.value[length].cotacaoVenda) //Envia o último PTAX  
        dataDia.append(formatDat(result.value[length].dataHoraCotacao)); //Dia e hora da última cotação   
        
        //tabela do PTAX do mês
        result.value.forEach( cotacaoVenda => {                  
           var li = document.createElement('p');
           var li2 = document.createElement('p');
           var div = document.createElement('div');
           const dataCerta = formatDat(cotacaoVenda.dataHoraCotacao);          
           
           li.textContent = dataCerta;
           li2.textContent= " R$ " + cotacaoVenda.cotacaoVenda;            
        
           div.setAttribute('class', 'bg-white p-3 rounded-lg border border-gray-300 hover:shadow-lg transition flex justify-between');
           div.setAttribute('id', 'cotacao-item')
           li.setAttribute('class', 'text-gray-600 text-sm');    
           li2.setAttribute('class', 'font-semibold text-sm sm:text-base md:text-lg truncate');       
           div.appendChild(li);
           div.appendChild(li2);          
           
           listValores.append(div)
        });
        media(result)                 
    }
}

xhttp1.send()

xhttpAno.open("GET", urlAnoTodo, true);

xhttpAno.onreadystatechange = function(){//Função a ser chamada quando a requisição retornar do servidor
    if ( xhttpAno.readyState == 4 && xhttpAno.status == 200 ) {//Verifica se o retorno do servidor deu certo
        const result = JSON.parse(xhttpAno.response) //Passa o retorno para JSON              
      
        mediaAno(result)                 
    }
}

xhttpAno.send()

//Criação dos botões dos meses
var tableMonth = document.querySelector('#meses');

    var button1 = document.createElement('button');
    var button2 = document.createElement('button');
    var button3 = document.createElement('button');
    var button4 = document.createElement('button');
    var button5 = document.createElement('button');
    var button6 = document.createElement('button');
    var button7 = document.createElement('button');
    var button8 = document.createElement('button');
    var button9 = document.createElement('button');
    var button10 = document.createElement('button');
    var button11 = document.createElement('button');
    var button12 = document.createElement('button');

    if(mes === 1){
        button1.setAttribute('class', 'px-3 py-1 text-sm rounded-lg bg-black text-white month');
    }else{
        button1.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    }
    button1.setAttribute('type', 'submit');
    button1.setAttribute('onclick', 'pesquisa(1)')
    button1.textContent="JAN"


    if(mes === 2){
        button2.setAttribute('class', 'px-3 py-1 text-sm rounded-lg bg-black text-white month');
    }else{
        button2.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    }
    button2.setAttribute('type', 'submit');
    button2.setAttribute('onclick', 'pesquisa(2)')
    button2.textContent="FEV"

    if(mes === 3){
        button3.setAttribute('class', 'px-3 py-1 text-sm rounded-lg bg-black text-white month');
    }else{
        button3.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    }
    button3.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    button3.setAttribute('type', 'submit');
    button3.setAttribute('onclick', 'pesquisa(3)')
    button3.textContent="MAR"

    if(mes === 4){
        button4.setAttribute('class', 'px-3 py-1 text-sm rounded-lg bg-black text-white month');
    }else{
        button4.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    }
    button4.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    button4.setAttribute('type', 'submit');
    button4.setAttribute('onclick', 'pesquisa(4)')
    button4.textContent="ABR"

    if(mes === 5){
        button5.setAttribute('class', 'px-3 py-1 text-sm rounded-lg bg-black text-white month');
    }else{
        button5.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    }
    button5.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    button5.setAttribute('type', 'submit');
    button5.setAttribute('onclick', 'pesquisa(5)')
    button5.textContent="MAI"

    if(mes === 6){
        button6.setAttribute('class', 'px-3 py-1 text-sm rounded-lg bg-black text-white month');
    }else{
        button6.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    }
    button6.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    button6.setAttribute('type', 'submit');
    button6.setAttribute('onclick', 'pesquisa(6)')
    button6.textContent="JUN"

    if(mes === 7){
        button7.setAttribute('class', 'px-3 py-1 text-sm rounded-lg bg-black text-white month');
    }else{
        button7.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    }
    button7.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    button7.setAttribute('type', 'submit');
    button7.setAttribute('onclick', 'pesquisa(7)')
    button7.textContent="JUL"

    if(mes === 8){
        button8.setAttribute('class', 'px-3 py-1 text-sm rounded-lg bg-black text-white month');
    }else{
        button8.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    }
    button8.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    button8.setAttribute('type', 'submit');
    button8.setAttribute('onclick', 'pesquisa(8)')
    button8.textContent="AGO"

    if(mes === 9){
        button9.setAttribute('class', 'px-3 py-1 text-sm rounded-lg bg-black text-white month');
    }else{
        button9.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    }
    button9.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    button9.setAttribute('type', 'submit');
    button9.setAttribute('onclick', 'pesquisa(9)')
    button9.textContent="SET"

    if(mes === 10){
        button10.setAttribute('class', 'px-3 py-1 text-sm rounded-lg bg-black text-white month');
    }else{
        button10.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    }
    button10.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    button10.setAttribute('type', 'submit');
    button10.setAttribute('onclick', 'pesquisa(10)')
    button10.textContent="OUT"

    if(mes === 11){
        button11.setAttribute('class', 'px-3 py-1 text-sm rounded-lg bg-black text-white month');
    }else{
        button11.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    }
    button11.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    button11.setAttribute('type', 'submit');
    button11.setAttribute('onclick', 'pesquisa(11)')
    button11.textContent="NOV"

    if(mes === 12){
        button12.setAttribute('class', 'px-3 py-1 text-sm rounded-lg bg-black text-white month');
    }else{
        button12.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    }
    button12.setAttribute('class', 'px-3 py-1 text-sm rounded-lg hover:bg-blue-200 transition month');
    button12.setAttribute('type', 'submit');
    button12.setAttribute('onclick', 'pesquisa(12)')
    button12.textContent="DEZ"

    tableMonth.append(button1);
    tableMonth.append(button2);
    tableMonth.append(button3);
    tableMonth.append(button4);
    tableMonth.append(button5);
    tableMonth.append(button6);
    tableMonth.append(button7);
    tableMonth.append(button8);
    tableMonth.append(button9);
    tableMonth.append(button10);
    tableMonth.append(button11);
    tableMonth.append(button12);

function pesquisa(mes){
    var dataInicial;
    var dataFinal;

    var botoes = document.querySelectorAll(".flex button"); // Seleciona todos os botões

    for (var i = 0; i < botoes.length; i++) {
        if (botoes[i].classList.contains("bg-black")) {
            var anoSelecionado = botoes[i].textContent.trim();
            break; // Para o loop após encontrar o selecionado
        }
    }

    if(mes === 1){
        dataInicial = `'01-01-${anoSelecionado}'`
        dataFinal=`'01-31-${anoSelecionado}'`
    }else if (mes === 2){
        dataInicial = `'02-01-${anoSelecionado}'`
        dataFinal=`'02-28-${anoSelecionado}'`

        // Considera anos bissextos
        if ((anoSelecionado % 4 === 0 && anoSelecionado % 100 !== 0) || anoSelecionado % 400 === 0) {
            dataFinal = `'02-29-${anoSelecionado}'`;
        }
    }else if (mes === 3){
        dataInicial = `'03-01-${anoSelecionado}'`
        dataFinal=`'03-31-${anoSelecionado}'`
    }else if (mes === 4){
        dataInicial = `'04-01-${anoSelecionado}'`
        dataFinal=`'04-30-${anoSelecionado}'`
    }else if (mes === 5){
        dataInicial = `'05-01-${anoSelecionado}'`
        dataFinal=`'05-31-${anoSelecionado}'`
    }else if (mes === 6){
        dataInicial =`'06-01-${anoSelecionado}'`
        dataFinal=`'06-30-${anoSelecionado}'`
    }else if (mes === 7){
        dataInicial = `'07-01-${anoSelecionado}'`
        dataFinal=`'07-31-${anoSelecionado}'`
    }else if (mes === 8){
        dataInicial = `'08-01-${anoSelecionado}'`
        dataFinal=`'08-31-${anoSelecionado}'`
    }else if (mes === 9){
        dataInicial =`'09-01-2023'`
        dataFinal=`'09-30-2023'`
    }else if (mes === 10){
        dataInicial =`'10-01-${anoSelecionado}'`
        dataFinal=`'10-31-${anoSelecionado}'`
    }else if (mes === 11){
        dataInicial =`'11-01-${anoSelecionado}'`
        dataFinal=`'11-30-${anoSelecionado}'`
    }else if (mes === 12){
        dataInicial = `'12-01-${anoSelecionado}'`
        dataFinal=`'12-31-${anoSelecionado}'`
    }

    listValores.innerHTML = '';

    var urlMesTodoo =`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial=${dataInicial}&@dataFinalCotacao=${dataFinal}&$top=1000&$format=json&$select=cotacaoVenda,dataHoraCotacao`

    xhttp.open("GET", urlMesTodoo, true);

    xhttp.onreadystatechange = function(){//Função a ser chamada quando a requisição retornar do servidor
        if ( xhttp.readyState == 4 && xhttp.status == 200 ) {//Verifica se o retorno do servidor deu certo
            const result = JSON.parse(xhttp.response) //Passa o retorno para JSON      
            //console.log(result.value);                 

            //Cria a tabela do PTAX do mês
            result.value.forEach( cotacaoVenda => {                  
            var li = document.createElement('p');
            var li2 = document.createElement('p');
            var div = document.createElement('div');
            const dataCerta = formatDat(cotacaoVenda.dataHoraCotacao);          
            
            li.textContent = dataCerta;
            li2.textContent= " R$ " + cotacaoVenda.cotacaoVenda;            
            
            div.setAttribute('class', 'bg-white p-3 rounded-lg border border-gray-300 hover:shadow-lg transition flex justify-between');
            div.setAttribute('id', 'cotacao-item')
            li.setAttribute('class', 'text-gray-600 text-sm');    
            li2.setAttribute('class', 'font-semibold text-sm sm:text-base md:text-lg truncate');       
            div.appendChild(li);
            div.appendChild(li2);          
            
            listValores.append(div)
            });  

            media(result)                    
        } 
    }
    xhttp.send() 

    xhttpAno.open("GET", urlAnoTodo, true);

    xhttpAno.onreadystatechange = function(){//Função a ser chamada quando a requisição retornar do servidor
    if ( xhttpAno.readyState == 4 && xhttpAno.status == 200 ) {//Verifica se o retorno do servidor deu certo
        const result = JSON.parse(xhttpAno.response) //Passa o retorno para JSON              
      
        mediaAno(result)                 
        }
    }

    xhttpAno.send()    
}

function media(result){

    var divMedia = document.querySelector('#mediaMes')

    var soma = 0;
    var length = 0;
    result.value.forEach( cotacaoVenda => { 
        soma = soma + cotacaoVenda.cotacaoVenda
        length = result.value.length;        
    });
    //console.log("soma", soma, "len", length)

    const media = soma / length;
    let mediaFormatadaMes = media.toFixed(4);

    if(isNaN(media) || media === 0){
        mediaFormatadaMes = "Sem dados do mês selecionado"
    }else{
        mediaFormatadaMes = `R$ ${mediaFormatadaMes}`
    }

    divMedia.textContent = mediaFormatadaMes;
}

function mediaAno(result) {
    console.log(result);
    var divAno = document.querySelector('#mediaAno');  

    var soma = 0;
    var length = result.value.length; 
    result.value.forEach(cotacaoVenda => { 
        soma += cotacaoVenda.cotacaoVenda;
    });

    const media = soma / length;
    const mediaFormatadaAno = media.toFixed(4);

    divAno.textContent = "R$" + mediaFormatadaAno;
}

document.addEventListener("DOMContentLoaded", function () {
    const botoes = document.querySelectorAll(".year"); // Seleciona apenas os botões da classe "year"

    botoes.forEach(botao => {
        botao.addEventListener("click", function () {           
            document.querySelector(".year.bg-black.text-white")?.classList.remove("bg-black", "text-white");
        
            botoes.forEach(btn => {
                if (!btn.classList.contains("bg-black")) {
                    btn.classList.add("hover:bg-blue-200", "transition");
                }
            });

            this.classList.remove("hover:bg-blue-200", "transition");
            
            this.classList.add("bg-black", "text-white");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const botoes = document.querySelectorAll(".month");

    botoes.forEach(botao => {
        botao.addEventListener("click", function () {
            // Remove "bg-black text-white" do botão atualmente selecionado
            document.querySelector(".month.bg-black.text-white")?.classList.remove("bg-black", "text-white");

            botoes.forEach(btn => {
                if (!btn.classList.contains("bg-black")) {
                    btn.classList.add("hover:bg-blue-200", "transition");
                }
            });

            this.classList.remove("hover:bg-blue-200", "transition");

            this.classList.add("bg-black", "text-white");
        });
    });
});






