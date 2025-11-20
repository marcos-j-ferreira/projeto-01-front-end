const pages = [
    // Páginas que exigem o prefixo '/page/'
    { title: "O que é", url: "/page/o-que-e.html" },
    { title: "Custos", url: "/page/custos.html" },
    { title: "Lab", url: "/page/lab.html" },
    
    // Páginas que NÃO exigem o prefixo '/page/'
    { title: "Mercado", url: "/mercado.html" },
    { title: "Sobre", url: "/sobre.html" }
];

const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('suggestions-list');

// URL para onde o usuário será direcionado se a busca não for encontrada
const NOT_FOUND_PAGE = "/not-found.html"; // Crie esta página com 'Not Found'

// Função para mostrar todas as sugestões quando a barra é clicada
function showAllSuggestions() {
    // Se a barra de pesquisa estiver vazia, mostre todas as opções
    if (searchInput.value.length === 0) {
        renderSuggestions(pages);
    }
}

// Função principal de filtro e renderização
function filterSuggestions() {
    const query = searchInput.value.toLowerCase();
    
    if (query.length === 0) {
        suggestionsList.innerHTML = ''; // Limpa a lista
        return; 
    }

    const filtered = pages.filter(page => 
        // Filtra por similaridade, mas prioriza começar com a palavra
        page.title.toLowerCase().startsWith(query) || page.title.toLowerCase().includes(query)
    );
    
    renderSuggestions(filtered);
}

// Função auxiliar para renderizar a lista
function renderSuggestions(list) {
    suggestionsList.innerHTML = '';
    
    list.forEach(page => {
        const item = document.createElement('li');
        item.textContent = page.title;
        // Ao clicar na sugestão, navega diretamente
        item.onclick = () => {
            window.location.href = page.url;
        };
        suggestionsList.appendChild(item);
    });
}

// Função para navegar ao clicar no botão 'Pesquisar' ou ENTER
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    // Procura uma correspondência exata ou a primeira correspondência
    const match = pages.find(page => 
        page.title.toLowerCase() === query
    );

    if (match) {
        window.location.href = match.url;
    } else {
        // Se não encontrar nenhuma página, redireciona para a página de erro
        window.location.href = NOT_FOUND_PAGE;
    }
}

// Lidar com a tecla 'Enter'
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        performSearch();
    }
});

// Oculta a lista de sugestões ao clicar fora (opcional, mas recomendado)
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
        suggestionsList.innerHTML = '';
    }
});