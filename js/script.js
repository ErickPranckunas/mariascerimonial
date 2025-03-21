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
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
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
    
    // Filtro de Portfólio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Slider de Depoimentos
    let testimonialCurrentSlide = 0;
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialPrevBtn = document.querySelector('.prev-btn');
    const testimonialNextBtn = document.querySelector('.next-btn');
    
    function showTestimonialSlide(index) {
        testimonialSlides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        testimonialSlides[index].style.display = 'block';
    }
    
    function nextTestimonialSlide() {
        testimonialCurrentSlide = (testimonialCurrentSlide + 1) % testimonialSlides.length;
        showTestimonialSlide(testimonialCurrentSlide);
    }
    
    function prevTestimonialSlide() {
        testimonialCurrentSlide = (testimonialCurrentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonialSlide(testimonialCurrentSlide);
    }
    
    // Inicializar slider de depoimentos
    if (testimonialSlides.length > 0) {
        showTestimonialSlide(testimonialCurrentSlide);
        
        // Event listeners para botões de navegação
        if (testimonialPrevBtn && testimonialNextBtn) {
            testimonialPrevBtn.addEventListener('click', prevTestimonialSlide);
            testimonialNextBtn.addEventListener('click', nextTestimonialSlide);
        }
        
        // Auto-rotação do slider - alterado de 5000 para 10000 (10 segundos)
        setInterval(nextTestimonialSlide, 10000);
    }
    
    // Formulário de Contato - Atualizado para Web3Forms
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Definir a URL de redirecionamento para a página atual
        const redirectInput = contactForm.querySelector('input[name="redirect"]');
        if (redirectInput) {
            redirectInput.value = window.location.href + '?success=true';
        }
        
        contactForm.addEventListener('submit', function(e) {
            // O Web3Forms vai processar o envio
            console.log('Formulário enviado para o Web3Forms');
        });
    }
    
    // Verificar se há parâmetro de sucesso na URL e mostrar mensagem
    function checkFormSuccess() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            // Criar elemento de mensagem de sucesso
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
            
            // Inserir antes do formulário
            const contactSection = document.getElementById('contato');
            if (contactSection && contactForm) {
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // Rolar até a mensagem
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Remover parâmetro da URL sem recarregar a página
                window.history.replaceState({}, document.title, window.location.pathname);
                
                // Remover a mensagem após alguns segundos
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 5000);
            }
        }
    }
    
    // Verificar sucesso do formulário quando a página carregar
    checkFormSuccess();
    
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
    
    // Imagens de fundo para cada slide - atualizando caminhos das imagens
    const backgroundImages = [
        'images/hero/hero-casamento.jpg',
        'images/hero/hero-corporativo.jpg',
        'images/hero/hero-formatura.jpg'
    ];
    
    // Function to update the active slide
    function updateHeroSlide(index) {
        // Remove active class from all slides and dots
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.visibility = 'hidden'; // Ensure slides are hidden when not active
            slide.style.opacity = '0'; // Ensure slides are transparent when not active
        });
        
        heroDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        heroSlides[index].classList.add('active');
        heroSlides[index].style.visibility = 'visible'; // Make the active slide visible
        heroSlides[index].style.opacity = '1'; // Make the active slide opaque
        heroDots[index].classList.add('active');
        
        // Update the background image of the hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundImage = `url(${backgroundImages[index]})`;
        }
        
        heroCurrentSlide = index;
    }
    
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
    }
    
    // Navegação entre seções
    const sectionNavItems = document.querySelectorAll('.section-nav-item');
    const sections = document.querySelectorAll('section[id]');
    const scrollDown = document.getElementById('scrollDown');
    
    // Atualizar navegação ativa durante o scroll
    function updateSectionNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.section-nav-item[data-section="${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`.section-nav-item[data-section="${sectionId}"]`).classList.remove('active');
            }
        });
        
        // Esconder/mostrar seta para baixo
        if (scrollY > 100) {
            scrollDown.style.opacity = '0';
            scrollDown.style.visibility = 'hidden';
        } else {
            scrollDown.style.opacity = '1';
            scrollDown.style.visibility = 'visible';
        }
    }
    
    // Adicionar event listeners para os itens de navegação
    sectionNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Adicionar event listener para a seta para baixo
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            const nextSection = document.querySelector('section:nth-of-type(2)');
            if (nextSection) {
                window.scrollTo({
                    top: nextSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Atualizar navegação no scroll
    window.addEventListener('scroll', updateSectionNav);
    
    // Inicializar navegação
    updateSectionNav();
    
    // Remover qualquer lista de navegação duplicada fora do footer
    document.querySelectorAll('body > ul').forEach(ul => {
        // Verificar se esta é uma lista de navegação não intencional
        if (!ul.closest('footer') && !ul.closest('header') && !ul.closest('nav')) {
            ul.remove();
        }
    });
});

// Corrigir navegação para o contato
document.querySelectorAll('a[href="#contato"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const contactSection = document.getElementById('contato');
        if (contactSection) {
            // Adiciona um pequeno atraso para garantir que a rolagem funcione corretamente
            setTimeout(() => {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    });
});

// Corrigir problema de navegação no footer
document.querySelectorAll('.footer-links a, .mobile-footer-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Navegação do Hero Slider
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    let currentSlide = 0;
    
    // Função para mostrar um slide específico
    function showSlide(index) {
        // Esconde todos os slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove a classe active de todos os dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostra o slide atual
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Event listeners para os botões de navegação
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            showSlide(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        });
    }
    
    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Autoplay opcional
    setInterval(function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
    }, 5000); // Muda a cada 5 segundos
});

// Highlight active navigation item based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    // Highlight active navigation item based on scroll position
    const navLinks = document.querySelectorAll('header nav ul li a');
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavItem() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                document.querySelector(`header nav ul li a[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }
    
    // Initial call to highlight the correct nav item
    highlightNavItem();
    
    // Add event listener for scroll
    window.addEventListener('scroll', highlightNavItem);
});

// Inicializar o slider de depoimentos com a nova função
initTestimonialSlider();
;