// Seletores
const mesAtual = document.getElementById('mesAtual');
const dias = document.getElementById('dias');
const btnMesAnterior = document.getElementById('mesAnterior');
const btnMesSeguinte = document.getElementById('mesSeguinte');
const modal = document.getElementById('taskModal');
const dataSelecionada = document.getElementById('dataSelecionada');
const taskInput = document.getElementById('taskInput');
const btnSalvar = document.getElementById('salvarTask');
const fecharModal = document.getElementById('fecharModal');

let data = new Date();

function gerarCalendario() {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diaInicial = primeiroDia.getDay();

    const nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    mesAtual.textContent = `${nomeMeses[mes]} ${ano}`;
    dias.innerHTML = "";

    //preenche os dias vazios antes do 1º dia do mês
    for (let i = 0; i < diaInicial; i++) {
        dias.innerHTML += `<div></div>`;
    }

    //preenche os dias do mês
    for (let d = 1; d <= ultimoDia.getDate(); d++) {
        const diaCompleto = `${String(d).padStart(2, '0')}/${String(mes + 1).padStart(2, '0')}/${ano}`;
        dias.innerHTML += `<div class="day" data-dia="${diaCompleto}">${d}</div>`;
    }

    //adiciona evento de clique nos dias
    document.querySelectorAll('.day').forEach(dia => {
        dia.addEventListener('click', () => {
            const dataSelecionadaTexto = dia.dataset.dia;
            abrirModal(dataSelecionadaTexto);
        });
    });
}

//navegação entre meses
btnMesAnterior.addEventListener('click', () => {
    data.setMonth(data.getMonth() - 1);
    gerarCalendario();
});

btnMesSeguinte.addEventListener('click', () => {
    data.setMonth(data.getMonth() + 1);
    gerarCalendario();
});

//funcionamento do modal
function abrirModal(dataTexto) {
    dataSelecionada.textContent = `Tarefa para ${dataTexto}`;
    taskInput.value = localStorage.getItem(dataTexto) || '';
    modal.classList.remove('hidden');
    modal.dataset.date = dataTexto;
}

fecharModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    taskInput.value = '';
});

btnSalvar.addEventListener('click', () => {
    const dataTarefa = modal.dataset.date;
    const tarefa = taskInput.value;
    localStorage.setItem(dataTarefa, tarefa);
    modal.classList.add('hidden');
});

gerarCalendario();
