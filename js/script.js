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
                // Definir offset como 0 para posicionar exatamente no início da seção
                const scrollOffset = 0;
                
                // Fechar menu mobile primeiro
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                }
                
                // Adicionar um pequeno atraso para garantir que o DOM esteja atualizado
                setTimeout(() => {
                    // Calcular posição considerando o scroll atual da página
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - scrollOffset;
                    
                    // Executar o scroll
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
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
    
    // Hero Slider Functionality
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    const heroPrevBtn = document.querySelector('.hero-prev');
    const heroNextBtn = document.querySelector('.hero-next');
    let heroCurrentSlide = 0;
    
    // Imagens de fundo para cada slide
    const backgroundImages = [
        'images/hero-casamento.jpg',
        'images/hero-corporativo.jpg',
        'images/hero-formatura.jpg'
    ];
    
    // Function to update the active slide
    function updateHeroSlide(index) {
        // Remove active class from all slides and dots
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.visibility = 'hidden';
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
        });
        
        heroDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        heroSlides[index].classList.add('active');
        heroSlides[index].style.visibility = 'visible';
        heroSlides[index].style.opacity = '1';
        heroSlides[index].style.zIndex = '2';
        
        heroDots[index].classList.add('active');
        
        // Garantir que o conteúdo e o botão estejam visíveis
        const currentContent = heroSlides[index].querySelector('.hero-content');
        const currentButton = heroSlides[index].querySelector('.btn');
        
        if (currentContent) {
            currentContent.style.opacity = '1';
            currentContent.style.visibility = 'visible';
        }
        
        if (currentButton) {
            currentButton.style.display = 'inline-block';
            currentButton.style.opacity = '1';
            currentButton.style.visibility = 'visible';
        }
        
        // Atualizar a imagem de fundo da seção hero
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundImage = `url(${backgroundImages[index]})`;
        }
        
        heroCurrentSlide = index;
    }

    // Função para alinhar textos e corrigir sobreposições nos slides
    const alignTextElements = () => {
        // Alinhar textos nos slides do hero
        const heroContents = document.querySelectorAll('.hero-content');
        heroContents.forEach((content, index) => {
            // Redefinir estilos para evitar conflitos
            content.style.display = 'block';
            content.style.position = 'absolute';
            content.style.textAlign = 'center';
            
            // Posicionamento básico
            content.style.width = '100%';
            content.style.left = '0';
            content.style.right = '0';
            content.style.margin = '0 auto';
            
            // Posicionamento vertical - ajustado para evitar sobreposição
            content.style.top = '50%';
            content.style.transform = 'translateY(-50%)';
            content.style.bottom = 'auto';
            
            // Garantir espaço para os controles de navegação
            content.style.padding = '0 60px 60px'; // Aumentar padding lateral e inferior
            content.style.maxWidth = '100%';
            content.style.boxSizing = 'border-box';
        });
        
        // Alinhar títulos em todos os slides
        const slideTitles = document.querySelectorAll('.hero-slide h1, .hero-slide h2, .hero-content h1, .hero-content h2');
        slideTitles.forEach((title) => {
            title.style.textAlign = 'center';
            title.style.width = '100%';
            title.style.margin = '0 auto 20px auto';
            title.style.maxWidth = '800px';
            title.style.lineHeight = '1.2';
            title.style.display = 'block';
            title.style.position = 'relative';
            title.style.fontSize = 'calc(2.2rem + 1vw)';
            title.style.marginBottom = '20px';
        });
        
        // Padronizar botões em todos os slides e evitar sobreposição
        const heroButtons = document.querySelectorAll('.hero-content .btn');
        heroButtons.forEach(btn => {
            btn.style.display = 'inline-block';
            btn.style.margin = '20px auto 0';
            btn.style.minWidth = '180px';
            btn.style.textAlign = 'center';
            btn.style.position = 'relative';
            btn.style.zIndex = '10'; // Maior que os controles de navegação
        });
        
        // Ajustar controles de navegação do slider
        const sliderControls = document.querySelectorAll('.hero-dots');
        sliderControls.forEach(control => {
            control.style.position = 'absolute';
            control.style.bottom = '20px';
            control.style.width = '100%';
            control.style.display = 'flex';
            control.style.justifyContent = 'center';
            control.style.zIndex = '5';
        });
        
        // Ajustar botões de navegação prev/next para evitar sobreposição
        const navButtons = document.querySelectorAll('.hero-prev, .hero-next');
        navButtons.forEach(btn => {
            btn.style.position = 'absolute';
            btn.style.top = '50%';
            btn.style.transform = 'translateY(-50%)';
            btn.style.zIndex = '5';
            
            // Ajustar posicionamento para evitar sobreposição com o CTA
            if (btn.classList.contains('hero-prev')) {
                btn.style.left = '20px';
            } else {
                btn.style.right = '20px';
            }
        });
    };
    
    // Verificar se os elementos do hero slider existem
    if (heroSlides.length > 0 && heroDots.length > 0) {
        // Garantir que o primeiro slide esteja ativo no carregamento
        updateHeroSlide(0);
        
        // Definir a imagem inicial
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundImage = `url(${backgroundImages[0]})`;
        }
        
        // Event listeners for dots
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateHeroSlide(index);
            });
        });
        
        // Event listeners for prev/next buttons
        if (heroPrevBtn) {
            heroPrevBtn.addEventListener('click', () => {
                let newIndex = heroCurrentSlide - 1;
                if (newIndex < 0) newIndex = heroSlides.length - 1;
                updateHeroSlide(newIndex);
            });
        }
        
        if (heroNextBtn) {
            heroNextBtn.addEventListener('click', () => {
                let newIndex = heroCurrentSlide + 1;
                if (newIndex >= heroSlides.length) newIndex = 0;
                updateHeroSlide(newIndex);
            });
        }
        
        // Auto-rotate slides every 5 seconds
        setInterval(() => {
            let newIndex = heroCurrentSlide + 1;
            if (newIndex >= heroSlides.length) newIndex = 0;
            updateHeroSlide(newIndex);
        }, 5000);
        
        // Executar alinhamento no carregamento da página
        alignTextElements();
        
        // Executar novamente quando a janela for redimensionada
        window.addEventListener('resize', alignTextElements);
    }
    
    // Remover a função duplicada de alignTextElements
    // (Havia duas definições da mesma função no código original)
    
    // Alinhar títulos e textos em todas as seções
    const sectionTitles = document.querySelectorAll('section h2, section h3');
    sectionTitles.forEach(title => {
        title.style.textAlign = 'center';
        title.style.width = '100%';
        title.style.margin = '0 auto 20px auto';
        title.style.maxWidth = '800px';
    });
    
    // Alinhar parágrafos descritivos em todas as seções
    const sectionTexts = document.querySelectorAll('section p:not(.btn)');
    sectionTexts.forEach(text => {
        text.style.textAlign = 'center';
        text.style.width = '100%';
        text.style.maxWidth = '800px';
        text.style.margin = '0 auto 20px auto';
    });
    
    // Centralizar todos os botões/CTAs em todas as seções
    const ctaButtons = document.querySelectorAll('.btn, button[type="submit"]');
    ctaButtons.forEach(btn => {
        const parent = btn.parentElement;
        parent.style.textAlign = 'center';
        parent.style.width = '100%';
        
        btn.style.display = 'inline-block';
        btn.style.margin = '0 auto';
        btn.style.minWidth = '180px';
        btn.style.textAlign = 'center';
    });
    
    // Ajustar controles de navegação do slider
    const sliderControls = document.querySelectorAll('.hero-dots');
    sliderControls.forEach(control => {
        control.style.position = 'absolute';
        control.style.bottom = '20px';
        control.style.width = '100%';
        control.style.display = 'flex';
        control.style.justifyContent = 'center';
        control.style.zIndex = '5';
    });
    
    // Ajustar botões de navegação prev/next
    const navButtons = document.querySelectorAll('.hero-prev, .hero-next');
    navButtons.forEach(btn => {
        btn.style.position = 'absolute';
        btn.style.top = '50%';
        btn.style.transform = 'translateY(-50%)';
        btn.style.zIndex = '5';
        
        // Ajustar posicionamento para evitar sobreposição com o CTA
        if (btn.classList.contains('hero-prev')) {
            btn.style.left = '20px';
        } else {
            btn.style.right = '20px';
        }
    });
    
    // Garantir que os CTAs fiquem acima dos botões de navegação
    const heroButtons = document.querySelectorAll('.hero-content .btn');
    heroButtons.forEach(btn => {
        btn.style.position = 'relative';
        btn.style.zIndex = '10'; // Valor maior que o zIndex dos botões de navegação
        btn.style.display = 'inline-block';
        btn.style.margin = '20px auto 0';
        btn.style.minWidth = '180px';
        btn.style.textAlign = 'center';
    });
});