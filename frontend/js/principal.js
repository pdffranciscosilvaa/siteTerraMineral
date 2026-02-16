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
   FORMULÁRIO DE CONTATO (PÁGINA - EMAIL)
============================= */
document.getElementById("contact-form").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const btn = form.querySelector("button");
  const originalText = btn.innerText;

  // 1. Efeito Visual (Seu design)
  btn.innerText = "Enviando...";
  btn.style.opacity = "0.7";
  btn.disabled = true;

  // 2. Captura os dados e transforma em JSON real
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: JSON.stringify(data), // Aqui enviamos o JSON que o erro pediu
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      }
    });

    if (response.ok) {
      // 3. Sucesso (Seu design)
      btn.innerText = "Enviado com Sucesso!";
      btn.style.background = "#2b5a27";
      btn.style.opacity = "1";

      if (typeof showToast === "function") {
        showToast("Sucesso", "Entraremos em contato em breve.");
      }
      
      form.reset();

      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
      
    } else {
      throw new Error();
    }
  } catch (error) {
    // 4. Erro
    btn.innerText = "Erro ao enviar";
    btn.style.background = "#a32a2a";
    
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.background = "";
      btn.disabled = false;
    }, 3000);
  }
});


/* ENVIO DE DOCUMENTOS VIA JS */

document.getElementById("contact-form").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const btn = form.querySelector("button[type='submit']");
  const originalText = btn.innerText;

  // Feedback visual
  btn.innerText = "Enviando...";
  btn.disabled = true;

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData, 
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      btn.innerText = "Enviado com Sucesso!";
      btn.style.background = "#2b5a27";
      form.reset();
      
      // Reseta o texto do anexo para o padrão
      document.getElementById('file-name-text').innerText = "Escolher arquivos";
      
      if (typeof showToast === "function") showToast("Sucesso", "Recebemos sua proposta.");
    } else {
      throw new Error();
    }
  } catch (error) {
    btn.innerText = "Erro ao enviar";
    btn.style.background = "#a32a2a";
  } finally {
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.background = "";
      btn.disabled = false;
    }, 3000);
  }
});

// --- LÓGICA ATUALIZADA PARA MÚLTIPLOS ARQUIVOS ---
document.getElementById('file-input').addEventListener('change', function() {
  const fileLabel = document.getElementById('file-name-text');
  const count = this.files.length;

  if (count === 0) {
    fileLabel.innerText = "Escolher arquivos";
  } else if (count === 1) {
    // Se for apenas 1, mostra o nome dele
    fileLabel.innerText = this.files[0].name;
  } else {
    // Se for mais de 1, mostra a quantidade para não quebrar o layout
    fileLabel.innerText = `${count} arquivos selecionados`;
  }
});


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
   MENU MOBILE & NAVEGAÇÃO
============================= */
const mobileBtn = document.getElementById("mobile-menu-btn");
const nav = document.getElementById("navbar");
// Selecionamos todos os links dentro do menu, inclusive os do dropdown
const navLinks = document.querySelectorAll("#navbar a");

// Abre e fecha o menu ao clicar no botão hambúrguer
mobileBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Lógica para fechar o menu ao clicar em um link e rolar suavemente
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // Verifica se o link é uma âncora (começa com #)
    if (href.startsWith("#")) {
      // 1. Fecha o menu mobile imediatamente
      nav.classList.remove("active");

      // 2. Faz a rolagem suave até a seção
      const targetId = href;
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        e.preventDefault(); // Previne o salto brusco
        
        // Calcula a posição descontando a altura da sua Top Bar + Header (aprox. 100px)
        const offsetPosition = targetSection.offsetTop - 100;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
    // Se não for # (ex: link para sobre.html), o navegador segue o link normalmente
  });
});

/* =============================
   ANIMAÇÃO RIPPLE BOTÕES (Mantida)
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



/* =============================
    NÚMEROS ANIMADOS (EXCLUSIVO)
============================= */
document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.querySelector('.stats-section');
  const statNumbers = document.querySelectorAll('.stat-number');
  let animationStarted = false;

  const animate = (el) => {
    // Garante que o target seja um número puro
    const target = +el.getAttribute('data-target'); 
    const duration = 2000; // 2 segundos
    const stepTime = 20; // atualização a cada 20ms
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        // Formatação final específica
        if (target === 10000) el.innerText = "10k";
        else if (target === 100) el.innerText = "100%";
        else if (target === 150) el.innerText = "+150";
        else el.innerText = Math.floor(target);
      } else {
        // Formatação durante a contagem
        if (target === 10000) el.innerText = Math.floor(current / 1000) + "k";
        else if (target === 100) el.innerText = Math.floor(current) + "%";
        else if (target === 150) el.innerText = "+" + Math.floor(current);
        else el.innerText = Math.floor(current);
      }
    }, stepTime);
  };

  // Intersection Observer para rodar apenas quando chegar na seção
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animationStarted) {
      animationStarted = true;
      statNumbers.forEach(num => animate(num));
    }
  }, { threshold: 0.5 });

  if (statsSection) observer.observe(statsSection);
});