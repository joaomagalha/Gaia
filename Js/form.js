const form = document.getElementById("contactForm");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  // DEBUG
  for (let pair of formData.entries()) {
    console.log(pair[0], "=", pair[1]);
  }

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    console.log("Web3Forms response:", data);

    if (response.ok && data.success) {
      alert("Mensagem enviada com sucesso!");
      form.reset();
    } else {
      alert("Web3Forms erro: " + JSON.stringify(data));
    }

  } catch (err) {
    console.error("Fetch error:", err);
    alert("Erro de rede ao enviar.");
  } finally {
    submitBtn.textContent = "Enviar";
    submitBtn.disabled = false;
  }
});