const dados = {
    classes: {
        1: {
            titulo: "Guerreiro",
            descricao: "Um poderoso guerreiro com força bruta e resistência incomparável.",
            imagem: "Guerreiro.jpg"
        },
        2: {
            titulo: "Mago",
            descricao: "Mestre das artes arcanas, capaz de lançar feitiços devastadores e controlar os elementos.",
            imagem: "Bardo.jpg"
        },
        3: {
            titulo: "Bardo",
            descricao: "Rei da musicalidade, capaz de realizar invocações e afetar seus aliados e inimigos com a música.",
            imagem: "Mago.jpg"
        },
        4: {
            titulo: "Arqueira",
            descricao: "Especialista em emboscadas e abates rápidos, sua precisão é letal.",
            imagem: "Arqueira.jpg"
        }
    },
    cartas: {
        1: {
            titulo: "Flechas gêmeas",
            descricao: "A arqueira se prepara para neutralizar seu alvo, mirando em dois pontos fracos do adversário.",
            imagem: "Tesoura.jpg"
        },
        2: {
            titulo: "Diplomacia",
            descricao: "O guerreiro entrega uma carta ao seu adversário, ainda se preparando para uma escalada na situação.",
            imagem: "Papel.jpg"
        },
        3: {
            titulo: "Chuva de meteoros",
            descricao: "Utilizando sua mana, o mago invoca meteoros envoltos em energia arcana que voam em direção aos seus desafetos.",
            imagem: "Pedra-mago.jpg"
        },
        4: {
            titulo: "Invocação: Golems",
            descricao: "A energia espiritual flui do instrumento do bardo, invocando golems de pedregulho que atacam todos os adversários próximos.",
            imagem: "Pedra.jpg"
        }
    }
};


function criarModal() {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(8px);
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
        border: 3px solid #c9a86a;
        border-radius: 15px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        color: #fff;
        font-size: 2.5rem;
        cursor: pointer;
        line-height: 1;
        z-index: 1001;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    `;

    const modalImageContainer = document.createElement('div');
    modalImageContainer.style.cssText = `
        width: 100%;
        aspect-ratio: 9/16;
        margin-bottom: 1.5rem;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    `;

    const modalImage = document.createElement('div');
    modalImage.id = 'modal-image';
    modalImage.style.cssText = `
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    `;

    const modalTitle = document.createElement('h3');
    modalTitle.id = 'modal-title';
    modalTitle.style.cssText = `
        color: #fff;
        margin-bottom: 1rem;
        font-size: 1.8rem;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    `;

    const modalDescription = document.createElement('p');
    modalDescription.id = 'modal-description';
    modalDescription.style.cssText = `
        color: #e0d0b9;
        line-height: 1.6;
        text-align: center;
        font-size: 1.1rem;
        padding: 0 1rem;
    `;

    closeBtn.addEventListener('click', fecharModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });

    closeBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(201, 168, 106, 0.2)';
        this.style.color = '#c9a86a';
    });

    closeBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.color = '#fff';
    });

    modalImageContainer.appendChild(modalImage);
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalImageContainer);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalDescription);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            fecharModal();
        }
    });

    return modal;
}

function abrirModal(tipo, id) {
    const modal = document.getElementById('modal');
    const dadosItem = dados[tipo][id];

    if (!dadosItem) return;

    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    modalImage.style.backgroundImage = `url(${dadosItem.imagem})`;
    modalImage.style.display = 'block';

    modalTitle.textContent = dadosItem.titulo;
    modalDescription.textContent = dadosItem.descricao;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    document.body.classList.add('modal-aberto');
}

function fecharModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-aberto');
}

document.addEventListener('DOMContentLoaded', function() {
    criarModal();

    const classesCards = document.querySelectorAll('.classes-carta');
    classesCards.forEach(card => {
        card.addEventListener('click', function() {
            const tipo = this.getAttribute('data-type');
            const id = this.getAttribute('data-id');
            abrirModal(tipo, id);
        });
        
        card.style.cursor = 'pointer';
    });

    const cartasCards = document.querySelectorAll('.cartas-cartas');
    cartasCards.forEach(card => {
        card.addEventListener('click', function() {
            const tipo = this.getAttribute('data-type');
            const id = this.getAttribute('data-id');
            abrirModal(tipo, id);
        });
        
        card.style.cursor = 'pointer';
    });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
});