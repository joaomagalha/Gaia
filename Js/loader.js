const opts = {
    lines: 9, // quantidade de linhas
    length: 10, // comprimento
    width: 17,  // espessura
    radius: 22, // raio interno
    scale: 0.25, // tamanho geral
    corners: 1,
    color: '#5D6640', // cor
    speed: 1, // rotação por segundo
    trail: 60, // rastro
    className: 'spinner'
    };

    // Pega o container
    const target = document.getElementById('preloader');

    // Cria o spinner
    const spinner = new Spinner(opts).spin(target);

    // Esconde o preloader quando a página terminar de carregar
    window.addEventListener("load", () => {
        setTimeout(() => {
        target.style.display = "none";
        spinner.stop();
        }, 1500); // 1,5 segundos
    });
