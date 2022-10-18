// Utilizando o valor já digitado
const previous = document.getElementById('previous-operation')

// Utilizando o valor atual
const current = document.getElementById('current-operation')

// Pegando o valor dos botões
const buttons = document.querySelectorAll('#buttons-container button')

// Criando uma classe da calculadora
class Calculator {

    // Definindo como ela vai começar
    constructor(previous, current) {
        this.previous = previous
        this.current = current
        this.currentOperation = ''

        // Funções em forma de Objeto(Biblioteca)
        this.operações = {
            "+": function (a, b) { return a + b },
            "-": function (a, b) { return a - b },
            "/": function (a, b) { return a / b },
            "*": function (a, b) { return a * b }
        }
    }

    // Adicionando o valor digitado à tela
    addDigit(digit) {

        // Checando de é uma operação disponível
        if (digit === '.' && this.current.innerText.includes(".")) {
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    // Todos os processos da calculadora
    processOperation(operation) {

        // Checa se é um valor nulo
        if (this.current.innerText === '' && operation != 'C') {
            if (this.previous.innerText !== "") {
                // Escolhe a operação
                this.changeOperation(operation)
            }
            return
        }

        // Pega o valor atual e o já digitado
        let operationValue
        const previous = +this.previous.innerText.split(' ')[0]
        const current = +this.current.innerText

        // Checa se a função está na Biblioteca de funções
        if (this.operações[operation]) {
            this.operações[operation](current, previous)
            operationValue = this.operações[operation](previous, current)
            this.updateScreen(operationValue, operation, current, previous)
        }

        // Caso não esteja ele passa por aqui para ver se está aqui
        switch (operation) {
            case "DEL":
                this.processDellOperator()
                return
            case "CE":
                this.processClearCurrentOperator()
                return
            case "C":
                this.processClearOperator()
                return
            case "=":
                this.processEqualsOperator()
                return
        }
    }

    // Função para limpar o campo atual
    clearCurrent() {
        this.current.innerText = ''
    }

    // Faz as alterações de valores na tela
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null) {
            this.current.innerText += this.currentOperation
        } else {
            // Checa se o valor é zero, caso seja atualiza o valor
            if (previous === 0) {
                operationValue = current
            }

            // Adiciona o valor atual para o previous
            this.previous.innerText = `${operationValue} ${operation}`
            this.clearCurrent()
        }
    }
    // Escolhe a fórmula desejada
    changeOperation(operation) {
        const mathOperation = ["*", "-", "+", "/"]
        if (!mathOperation.includes(operation)) {
            return
        }

        this.previous.innerText = this.previous.innerText.slice(0, -1) + operation
    }

    // Deleta o último digito
    processDellOperator() {
        this.current.innerText = this.current.innerText.slice(0, -1)
    }

    // Limpa o compo de digitação atual
    processClearCurrentOperator() {
        this.current.innerText = ""
    }

    // Limpa a calculadora
    processClearOperator() {
        this.current.innerText = ""
        this.previous.innerText = ""
    }

    // Operação do =
    processEqualsOperator() {
        const operation = this.previous.innerText.split(' ')[1]
        this.processOperation(operation)
    }

}

// Atribuo a classe a uma variável para poder utiliza-la
const calc = new Calculator(previous, current)

// Pego a variável buttons e faço uma verificação se houve um evento
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // Pego o valor do botão digitado
        const value = e.target.innerText

        // Faço uma verificação para ver se é um número para calcular
        if (+value >= 0 || value === '.') {
            calc.addDigit(value)
        } else 
        // Se não for faço a verificação se é uma função
        {
            calc.processOperation(value)
        }
    })
})

// Evento para verificar se alguma tecla do teclado foi digitado
document.addEventListener('keydown', (e)=>{

    // Atribuo alguns nomes substitutos para nome de funções da calculadora
    let transition = {
        "Backspace": "DEL",
        "Enter": "=",
        "Escape": "C"
    }

    // Pego o valor digitado
    let value = e.key

    // Se a tecla estiver na biblioteca eu substituo o valor
    if(transition[value]){
        value = transition[value]
    }

    // Repito a verificação para fazer o calculo
    if (+value >= 0 || value === '.') {
        calc.addDigit(value)
    } else {
        calc.processOperation(value)
    }
})