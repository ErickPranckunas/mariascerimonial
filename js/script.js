document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    // Verificar se o menu-toggle existe e criar spans se necessário
    if (menuToggle && !menuToggle.querySelector('span')) {
        // Limpar qualquer conteúdo existente
        menuToggle.innerHTML = '';
        
        // Adicionar os três spans para o ícone de hambúrguer
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            menuToggle.appendChild(span);
        }
    }
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Scroll Suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile após clicar
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Header Fixo com Mudança de Estilo no Scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    });
    
    // Filtro de Portfólio - Atualizado para incluir "igreja" e remover "praia" e "destino"
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Atualizar texto dos botões de filtro se necessário
    filterButtons.forEach(button => {
        const filterType = button.getAttribute('data-filter');
        if (filterType === 'praia') {
            button.setAttribute('data-filter', 'igreja');
            button.textContent = 'Igreja';
        } else if (filterType === 'destino') {
            // Ocultar este botão ou substituir por outro se necessário
            button.style.display = 'none';
        }
        
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                // Atualizar categorias dos itens do portfólio
                if (item.getAttribute('data-category') === 'praia') {
                    item.setAttribute('data-category', 'igreja');
                }
                
                // Ocultar itens de "destino"
                if (item.getAttribute('data-category') === 'destino') {
                    item.style.display = 'none';
                    return;
                }
                
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Slider de Depoimentos
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    function showSlide(index) {
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        slides[index].style.display = 'block';
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Inicializar slider
    showSlide(currentSlide);
    
    // Event listeners para botões de navegação
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Auto-rotação do slider
    setInterval(nextSlide, 5000);
    
    // Formulário de Contato
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você adicionaria o código para enviar o formulário via AJAX
            // Por enquanto, apenas simulamos o envio
            
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }
    
    // Formulário de Newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            alert('Inscrição realizada com sucesso!');
            newsletterForm.reset();
        });
    }
    
    // Animações ao Scroll
    const animateElements = document.querySelectorAll('.fade-in');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Verificar elementos visíveis no carregamento inicial
    checkScroll();
    
    // Verificar elementos visíveis durante o scroll
    window.addEventListener('scroll', checkScroll);
});