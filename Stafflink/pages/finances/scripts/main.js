import { allUtils } from "../../../patternScripts/main.js";
allUtils.access()

allUtils.sideMenu()
allUtils.notes()

const allCardsData = document.querySelectorAll('.dataCard .cardbody span')

allCardsData.forEach(element => {
    if(element.className == "money") {
        const number = allUtils.numberBRLFormater.format(Math.random() * 100000)
        element.textContent = number
    } else {
        const number = Math.floor(Math.random() * 100000)
        element.textContent = number.toLocaleString('pt-br')
    }
});

const profitChart = document.getElementById('profit');
const dataMonths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

const diversityChart = document.getElementById('diversity');
const diversityData = ['Produção', 'Vendas', 'Administração', 'Estoque']




new Chart(profitChart, {
    type: 'bar',
    data: {
        labels: dataMonths,
        datasets: [{
            label: 'Lucro líquido mensal',
            data: Array.from({length: dataMonths.length}, () => Math.random() * 100000),
            borderWidth: 1,
            borderColor: [
                'rgb(57, 202, 103)'
            ],
            backgroundColor: [
                'rgba(57, 202, 103, 0.4)'
            ]
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
});

new Chart(diversityChart, {
    type: 'pie',
    data: {
        labels: diversityData,
        datasets: [{
            label: 'Quantidade de funcionários por setor',
            data: Array.from(diversityData, () => Math.floor(Math.random() * 100)),
            backgroundColor: [
                'rgb(17, 92, 198)',
                'rgb(106, 24, 194)',
                'rgb(24, 194, 86)',
                'rgb(194, 101, 24)',
                'rgb(194, 24, 183)'
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Quantidade de funcionários por setor'
            }
        }
    },
});

const salaryChart = document.getElementById('salary');
const salaryData = ['Produção', 'Vendas', 'Administração', 'Estoque'];
const salaryArray = Array.from(salaryData, () => Math.floor(Math.random() * 2500));

new Chart(salaryChart, {
    type: 'pie',
    data: {
        labels: salaryData,
        datasets: [{
            label: 'Média salarial R$',
            data: salaryArray,
            backgroundColor: [
                'rgb(17, 92, 198)',
                'rgb(106, 24, 194)',
                'rgb(24, 194, 86)',
                'rgb(194, 101, 24)',
                'rgb(194, 24, 183)'
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Diferença salarial entre setores - em reais'
            }
        }
    },
});