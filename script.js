document.addEventListener('DOMContentLoaded', () => {
    const classeSelect = document.getElementById('classe');
    const vigorAtributoInput = document.getElementById('vigor-atributo');
    const sanidadeAtributoInput = document.getElementById('sanidade-atributo');
    const agilidadeInput = document.getElementById('agilidade');
    const forcaInput = document.getElementById('forca');
    const vidaInput = document.getElementById('vida');
    const sanidadeInput = document.getElementById('sanidade');
    const estaminaInput = document.getElementById('estamina');
    const defesaInput = document.getElementById('defesa');
    const movimentoInput = document.getElementById('movimento');
    const pesoCarregadoInput = document.getElementById('peso-carregado');
    const inventoryDiv = document.querySelector('.inventory');
    const addItemButton = document.getElementById('add-item');
    const periciaInput = document.getElementById('pericia');
    const nivelPericiaSelect = document.getElementById('nivel-pericia');
    const listaPericiasDiv = document.querySelector('.lista-pericias');
    const addPericiaButton = document.getElementById('add-pericia');

    function calcularPesoMaximo(forca) {
        switch (forca) {
            case 0: return 5;
            case 1: return 7;
            case 2: return 10;
            case 3: return 13;
            default: return 5;
        }
    }

    function calcularPesoCarregado() {
        let pesoTotal = 0;
        const itemWeights = document.querySelectorAll('.item-weight');
        itemWeights.forEach(input => {
            pesoTotal += parseFloat(input.value) || 0;
        });
        const forca = parseInt(forcaInput.value) || 0;
        const pesoMaximo = calcularPesoMaximo(forca);
        pesoCarregadoInput.value = `${pesoTotal.toFixed(1)}kg/${pesoMaximo}kg`;
    }

    function atualizarInformacoes() {
        const classe = classeSelect.value;
        const vigor = parseInt(vigorAtributoInput.value) || 0;
        const sanidade = parseInt(sanidadeAtributoInput.value) || 0;
        const agilidade = parseInt(agilidadeInput.value) || 0;
        const forca = parseInt(forcaInput.value) || 0;

        let vida = 0;
        let sanidadeValor = 0;
        let estamina = 0;
        let defesa = 0;
        let movimento = 6 + vigor;

        switch (classe) {
            case 'militar':
                vida = 10 + vigor * 2;
                sanidadeValor = 10 + sanidade;
                estamina = 10 + vigor;
                defesa = 8 + agilidade;
                break;
            case 'medico':
                vida = 7 + vigor;
                sanidadeValor = 12 + sanidade * 2;
                estamina = 6 + vigor;
                defesa = 6 + agilidade;
                break;
            case 'engenheiro':
                vida = 10 + vigor;
                sanidadeValor = 8 + sanidade;
                estamina = 8 + vigor;
                defesa = 7 + agilidade;
                break;
            case 'cientista':
                vida = 5 + vigor;
                sanidadeValor = 9 + sanidade;
                estamina = 7 + vigor;
                defesa = 6 + agilidade;
                break;
            case 'civil':
                vida = 10 + vigor * 2;
                sanidadeValor = 8 + sanidade;
                estamina = 10 + vigor;
                defesa = 8 + agilidade;
                break;
        }

        vidaInput.value = vida;
        sanidadeInput.value = sanidadeValor;
        estaminaInput.value = estamina;
        defesaInput.value = defesa;
        movimentoInput.value = movimento;
    }

    // Atualiza as informações ao mudar a classe
    classeSelect.addEventListener('change', atualizarInformacoes);
    
    // Atualiza as informações e o peso carregado ao mudar os atributos
    vigorAtributoInput.addEventListener('input', () => {
        atualizarInformacoes();
        calcularPesoCarregado();
    });
    sanidadeAtributoInput.addEventListener('input', () => {
        atualizarInformacoes();
        calcularPesoCarregado();
    });
    agilidadeInput.addEventListener('input', () => {
        atualizarInformacoes();
        calcularPesoCarregado();
    });
    forcaInput.addEventListener('input', () => {
        atualizarInformacoes();
        calcularPesoCarregado();
    });

    // Adiciona um novo item ao inventário
    addItemButton.addEventListener('click', () => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <input type="text" class="item-name" placeholder="Nome do item">
            <input type="number" class="item-weight" placeholder="Peso" oninput="calcularPesoCarregado()">
            <button class="remove-item">Remover</button>
        `;
        inventoryDiv.appendChild(itemDiv);

        // Remove um item do inventário
        const removeButton = itemDiv.querySelector('.remove-item');
        removeButton.addEventListener('click', () => {
            itemDiv.remove();
            calcularPesoCarregado();
        });
    });

    // Adiciona uma nova perícia à lista
    addPericiaButton.addEventListener('click', () => {
        const periciaNome = periciaInput.value.trim();
        const periciaNivel = nivelPericiaSelect.value;
        if (periciaNome) {
            const periciaDiv = document.createElement('div');
            periciaDiv.classList.add('pericia');
            periciaDiv.innerHTML = `
                <span>${periciaNome} (${periciaNivel})</span>
                <button class="remove-pericia">Remover</button>
            `;
            listaPericiasDiv.appendChild(periciaDiv);

            // Remove uma perícia da lista
            const removeButton = periciaDiv.querySelector('.remove-pericia');
            removeButton.addEventListener('click', () => {
                periciaDiv.remove();
            });

            periciaInput.value = '';
            nivelPericiaSelect.value = 'iniciante';
        }
    });
});
