/* =============================
   ANO FOOTER
============================= */
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.innerText = new Date().getFullYear();
}


/* =============================
   SISTEMA DE SELEÇÃO DE ESCOPO (SEM PREÇOS)
============================= */

let quoteItems = [];
const countDisplay = document.getElementById("quote-count");
const modal = document.getElementById("quote-modal");
const quoteList = document.getElementById("quote-list");

/* Adicionar serviço à lista */
function addToQuote(serviceName) {
  // Evita adicionar o mesmo serviço duas vezes
  const jaExiste = quoteItems.find(item => item.name === serviceName);
  
  if (jaExiste) {
    showToast("Aviso", "Este serviço já está na sua lista.");
    return;
  }

  quoteItems.push({ name: serviceName });

  // Atualiza a bolinha do contador
  countDisplay.innerText = quoteItems.length;
  countDisplay.style.transform = "scale(1.5)";
  setTimeout(() => countDisplay.style.transform = "scale(1)", 200);

  showToast("Serviço Selecionado", serviceName + " foi adicionado ao seu interesse.");
}

/* Renderizar lista no Modal */
function renderQuote() {
  quoteList.innerHTML = "";

  if (quoteItems.length === 0) {
    quoteList.innerHTML = `
      <div style="text-align:center; padding:30px; color:#888;">
        <ion-icon name="cart-outline" style="font-size: 3rem; opacity:0.3;"></ion-icon>
        <p>Sua lista está vazia. Selecione serviços para orçar.</p>
      </div>`;
    return;
  }

  quoteItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("quote-item");
    
    // Estilização direta para garantir o alinhamento sem mexer no CSS
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";
    div.style.padding = "12px";
    div.style.borderBottom = "1px solid #eee";

    div.innerHTML = `
      <span style="font-weight: 600; color: #333;">${item.name}</span>
      <button onclick="removeItem(${index})" style="background:none; border:none; cursor:pointer; color:#ff4d4d; font-size:1.4rem; display:flex;">
        <ion-icon name="trash-outline"></ion-icon>
      </button>
    `;

    quoteList.appendChild(div);
  });
}

/* Remover item */
function removeItem(index) {
  quoteItems.splice(index, 1);
  renderQuote();
  countDisplay.innerText = quoteItems.length;
}

/* Abrir modal */
const btnOrçamento = document.getElementById("btn-quote-summary");
if(btnOrçamento) {
    btnOrçamento.addEventListener("click", () => {
      modal.classList.add("active");
      renderQuote();
    });
}

/* Fechar modal */
document.getElementById("close-quote").addEventListener("click", () => {
  modal.classList.remove("active");
});

/* Enviar para o WhatsApp do Chefe */
document.getElementById("send-whatsapp").addEventListener("click", () => {

  if (quoteItems.length === 0) {
    alert("Por favor, selecione ao menos um serviço para solicitar orçamento.");
    return;
  }

  let mensagem = "Olá! Gostaria de solicitar um orçamento para os seguintes serviços da *Terra Mineral*:%0A%0A";

  quoteItems.forEach(item => {
    mensagem += `✅ *${item.name}*%0A`;
  });

  mensagem += "%0A---%0A*Localização e detalhes do projeto:* %0A(Por favor, descreva a área aqui)";

  const numero = "554891573130"; 

  window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
});


/* =============================
   TOAST (ALERTAS FLUTUANTES)
============================= */
function showToast(title, message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';

  toast.innerHTML = `
    <div class="toast-icon">
      <ion-icon name="checkmark-circle"></ion-icon>
    </div>
    <div class="toast-content">
      <h4>${title}</h4>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}


/* =============================
   FORMULÁRIO DE CONTATO (PÁGINA)
============================= */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button");
  const originalText = btn.innerText;

  btn.innerText = "Enviando...";
  btn.style.opacity = "0.7";

  setTimeout(() => {
    btn.innerText = "Enviado com Sucesso!";
    btn.style.background = "#2b5a27";
    btn.style.opacity = "1";

    showToast("Sucesso", "Entraremos em contato em breve.");
    e.target.reset();

    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.background = "";
    }, 3000);
  }, 1500);
}


/* =============================
   BUSCA DE SERVIÇOS
============================= */
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("service-search");
  const clearBtn = document.getElementById("clear-search");
  const serviceCards = document.querySelectorAll(".service-card");

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase().trim();
    clearBtn.style.display = termo ? "block" : "none";

    if (termo.length > 0) {
      document.getElementById("services").scrollIntoView({ behavior: "smooth" });
    }

    serviceCards.forEach(card => {
      const titulo = card.querySelector(".card-title").textContent.toLowerCase();
      const descricao = card.querySelector("p").textContent.toLowerCase();

      card.style.display =
        titulo.includes(termo) || descricao.includes(termo)
          ? "block"
          : "none";
    });
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
    searchInput.focus();
  });
});


/* =============================
   MENU MOBILE
============================= */
const mobileBtn = document.getElementById("mobile-menu-btn");
const nav = document.getElementById("navbar");

mobileBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});

/* =============================
   ANIMAÇÃO RIPPLE BOTÕES
============================= */
document.querySelectorAll(".btn-primary").forEach(button => {
  button.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    circle.classList.add("ripple");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    circle.style.width = circle.style.height = size + "px";
    circle.style.left = e.clientX - rect.left - size / 2 + "px";
    circle.style.top = e.clientY - rect.top - size / 2 + "px";

    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});

/* =============================
    TOOLTIP WHATSAPP (LOOP INFINITO)
============================= */
window.addEventListener('load', () => {
  const tooltip = document.getElementById('whatsapp-tooltip');
  
  if (tooltip) {
    // Função que controla o ciclo de exibir/esconder
    const mostrarTooltipTemporariamente = () => {
      // 1. Adiciona a classe para mostrar
      tooltip.classList.add('show');
      
      // 2. Agenda para remover a classe após 8 segundos
      setTimeout(() => {
        tooltip.classList.remove('show');
      }, 8000); 
    };

    // Executa a primeira vez após 5 segundos do carregamento da página
    setTimeout(mostrarTooltipTemporariamente, 5000);

    // Cria o intervalo para repetir o ciclo a cada 30 segundos (exemplo)
    // O tempo deve ser maior que o tempo que o tooltip fica aberto (8s)
    setInterval(() => {
      mostrarTooltipTemporariamente();
    }, 30000); // 30000ms = 30 segundos
  }
});