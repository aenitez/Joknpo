// script.js

// Dados das classes e cartas
const dados = {
    classes: {
        1: {
            titulo: "Orc Guerreiro",
            descricao: "Um poderoso guerreiro orc com força bruta e resistência incomparável. Perfeito para quem gosta de combate corpo a corpo.",
            imagem: "orc.png"
        },
        2: {
            titulo: "Mago Arcano",
            descricao: "Mestre das artes arcanas, capaz de lançar feitiços devastadores e controlar os elementos. Ideal magia e estratégia à distância.",
            imagem: "mago.png"
        },
        3: {
            titulo: "Clérico Divino",
            descricao: "Servo dos deuses, com habilidades de cura e proteção. Combina suporte ao grupo com poderosas magias divinas para enfrentar as trevas.",
            imagem: "clérico.png"
        },
        4: {
            titulo: "Assassino Sombrio",
            descricao: "Mestre da furtividade e dos golpes precisos. Especialista em emboscadas e eliminação rápida de alvos prioritários.",
            imagem: "assassino.png"
        }
    },
    cartas: {
        1: {
            titulo: "Estratégia Ofensiva",
            descricao: "Carta que aumenta o poder de ataque em 50% por 3 turnos. Perfeita para momentos decisivos na batalha.",
            imagem: "carta-ofensiva.jpg" // Substitua pelo nome real da imagem
        },
        2: {
            titulo: "Barreira Mágica",
            descricao: "Cria um escudo protetor que absorve dano mágico. Essencial contra magos e criaturas místicas.",
            imagem: "carta-barreira.jpg" // Substitua pelo nome real da imagem
        },
        3: {
            titulo: "Cura Regenerativa",
            descricao: "Restaura pontos de vida gradualmente ao longo do tempo. Mantém seu personagem em combate por mais tempo.",
            imagem: "carta-cura.jpg" // Substitua pelo nome real da imagem
        },
        4: {
            titulo: "Furtividade Total",
            descricao: "Torna o personagem invisível por um turno, permitindo reposicionamento tático ou ataque surpresa.",
            imagem: "carta-furtividade.jpg" // Substitua pelo nome real da imagem
        }
    }
};

// Criar e configurar o modal
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

    // Adicionar elementos ao modal
    modalImageContainer.appendChild(modalImage);
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalImageContainer);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalDescription);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    // Adicionar evento de tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            fecharModal();
        }
    });

    return modal;
}

// Função para abrir o modal
function abrirModal(tipo, id) {
    const modal = document.getElementById('modal');
    const dadosItem = dados[tipo][id];

    if (!dadosItem) return;

    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    // Configurar a imagem mantendo a proporção 9:16
    modalImage.style.backgroundImage = `url(${dadosItem.imagem})`;
    modalImage.style.display = 'block';

    modalTitle.textContent = dadosItem.titulo;
    modalDescription.textContent = dadosItem.descricao;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Adicionar classe para prevenir scroll
    document.body.classList.add('modal-aberto');
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-aberto');
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Criar o modal
    criarModal();

    // Adicionar event listeners para os cards de classes
    const classesCards = document.querySelectorAll('.classes-carta');
    classesCards.forEach(card => {
        card.addEventListener('click', function() {
            const tipo = this.getAttribute('data-type');
            const id = this.getAttribute('data-id');
            abrirModal(tipo, id);
        });
        
        // Adicionar cursor pointer para indicar que é clicável
        card.style.cursor = 'pointer';
    });

    // Adicionar event listeners para os cards de cartas
    const cartasCards = document.querySelectorAll('.cartas-cartas');
    cartasCards.forEach(card => {
        card.addEventListener('click', function() {
            const tipo = this.getAttribute('data-type');
            const id = this.getAttribute('data-id');
            abrirModal(tipo, id);
        });
        
        // Adicionar cursor pointer para indicar que é clicável
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