// Seletores de Navegação das Páginas
const navButtons = document.querySelectorAll('.nav-btn');
const backButtons = document.querySelectorAll('.back-btn');
const pages = document.querySelectorAll('.page');

// Seletores de Acessibilidade
const toggleThemeBtn = document.getElementById('toggle-theme');
const toggleLangBtn = document.getElementById('toggle-lang');
const langTexts = document.querySelectorAll('.lang-text');

// 1. LÓGICA DE NAVEGAÇÃO
function changePage(targetPageId) {
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(targetPageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetPageId = button.getAttribute('data-target');
        changePage(targetPageId);
    });
});

backButtons.forEach(button => {
    button.addEventListener('click', () => {
        changePage('home-page');
    });
});

// 2. ACESSIBILIDADE: MODO ESCURO / ALTO CONTRASTE
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// 3. MULTI-IDIOMA: ALTERNAR ENTRE PORTUGUÊS (PT) E INGLÊS (EN)
toggleLangBtn.addEventListener('click', () => {
    const currentLang = toggleLangBtn.getAttribute('data-lang');
    let nextLang = currentLang === 'pt' ? 'en' : 'pt';
    
    // Atualiza o texto do botão de idioma
    toggleLangBtn.setAttribute('data-lang', nextLang);
    toggleLangBtn.textContent = nextLang === 'pt' ? '🌐 Idioma: PT' : '🌐 Lang: EN';
    
    // Varre todos os textos traduzíveis e altera seu conteúdo dinamicamente
    langTexts.forEach(el => {
        const textTranslation = el.getAttribute(`data-${nextLang}`);
        if (textTranslation) {
            // Se possuir tags internas (como o span do botão), altera de forma segura
            if (el.children.length === 0) {
                el.textContent = textTranslation;
            } else {
                el.innerHTML = textTranslation;
            }
        }
    });
});
