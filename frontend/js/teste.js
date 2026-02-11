/* =============================
   ANO FOOTER
============================= */
document.getElementById('year').innerText = new Date().getFullYear();


/* =============================
   SISTEMA DE ORÇAMENTO
============================= */

let quoteItems = [];
const countDisplay = document.getElementById("quote-count");
const modal = document.getElementById("quote-modal");
const quoteList = document.getElementById("quote-list");
const totalDisplay = document.getElementById("quote-total");

/* Adicionar serviço */
function addToQuote(serviceName, price) {

  quoteItems.push({ name: serviceName, price });

  countDisplay.innerText = quoteItems.length;

  countDisplay.style.transform = "scale(1.5)";
  setTimeout(() => countDisplay.style.transform = "scale(1)", 200);

  showToast("Serviço Adicionado", serviceName + " incluído.");
}

/* Renderizar lista */
function renderQuote() {

  quoteList.innerHTML = "";
  let total = 0;

  quoteItems.forEach((item, index) => {

    total += item.price;

    const div = document.createElement("div");
    div.classList.add("quote-item");

    div.innerHTML = `
      <span>${item.name}</span>
      <span>
        R$ ${item.price.toFixed(2)}
        <button onclick="removeItem(${index})">🗑</button>
      </span>
    `;

    quoteList.appendChild(div);
  });

  totalDisplay.innerText = total.toFixed(2);
}

/* Remover item */
function removeItem(index) {
  quoteItems.splice(index, 1);
  renderQuote();
  countDisplay.innerText = quoteItems.length;
}

/* Abrir modal */
document.querySelector(".btn-quote").addEventListener("click", () => {
  modal.classList.add("active");
  renderQuote();
});

/* Fechar modal */
document.getElementById("close-quote").addEventListener("click", () => {
  modal.classList.remove("active");
});

/* Enviar WhatsApp */
document.getElementById("send-whatsapp").addEventListener("click", () => {

  if (quoteItems.length === 0) {
    alert("Adicione serviços ao orçamento.");
    return;
  }

  let mensagem = "Olá! Gostaria de solicitar orçamento:%0A%0A";
  let total = 0;

  quoteItems.forEach(item => {
    mensagem += `• ${item.name} - R$ ${item.price}%0A`;
    total += item.price;
  });

  mensagem += `%0ATotal: R$ ${total}`;

  const numero = "554891573130"; // ALTERAR AQUI

  window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
});


/* =============================
   TOAST
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
   FORMULÁRIO
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

document.querySelectorAll(".has-dropdown").forEach(item => {
  item.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      item.classList.toggle("active");
    }
  });
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
   HIGHLIGHT SEÇÃO (SCROLL)
============================= */

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("section-highlight");

      setTimeout(() => {
        entry.target.classList.remove("section-highlight");
      }, 1000);
    }

  });

}, { threshold: 0.4 });

document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
});
