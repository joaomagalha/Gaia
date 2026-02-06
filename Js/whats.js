const phoneNumber = "5565999281805"; 

const buttons = document.querySelectorAll(".servicesCardBtn");

buttons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // Encontra o card pai
    const card = btn.closest(".servicesCard");

    if (!card) return;

    // Pega a mensagem específica do card
    const message = card.dataset.message;

    if (!message) {
      console.warn("Este card não possui data-message:", card);
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(url, "_blank");
  });
});

const whatsappButtons = document.querySelectorAll(".whatsappBtn");

whatsappButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const message = btn.dataset.message;

    if (!message) {
      console.warn("Este botão não possui data-message:", btn);
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(url, "_blank");
  });
});