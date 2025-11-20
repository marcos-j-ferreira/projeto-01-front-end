
        // Obtém o elemento da barra de progresso
    const progressBar = document.getElementById('progress-bar');

    // Função que calcula a posição de rolagem
    function updateProgressBar() {
        // 1. Altura total da página (que pode ser rolada)
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // 2. Distância que o usuário rolou
        const scrolledDistance = document.documentElement.scrollTop;

        // 3. Calcula a porcentagem de progresso
        // (Distância rolada / Altura total rolável) * 100
        const progress = (scrolledDistance / totalHeight) * 100;

        // 4. Aplica a porcentagem como largura do elemento
        progressBar.style.width = progress + '%';
    }

    // Ouve o evento de rolagem do navegador para atualizar a barra
    window.addEventListener('scroll', updateProgressBar);

    // Executa uma vez na carga da página para inicializar a posição
    document.addEventListener('DOMContentLoaded', updateProgressBar);