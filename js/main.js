document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation
    const sectionIndicators = document.querySelectorAll('.section-indicator');
    const sections = document.querySelectorAll('.section');
    
    // Function to update active section indicator
    function updateActiveSectionIndicator() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            // 300px offset to trigger the change earlier
            if (scrollPosition >= sectionTop - 300 && 
                scrollPosition < sectionTop + sectionHeight - 300) {
                currentSection = section.getAttribute('id');
            }
        });
        
        sectionIndicators.forEach(indicator => {
            indicator.classList.remove('active');
            if (indicator.getAttribute('href') === `#${currentSection}`) {
                indicator.classList.add('active');
            }
        });
    }
    
    // Initial call to set active indicator
    updateActiveSectionIndicator();
    
    // Update active indicator on scroll
    window.addEventListener('scroll', () => {
        updateActiveSectionIndicator();
    });
    
    // Smooth scrolling for internal links with offset for fixed navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset to account for any fixed elements
                const offset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                // Offset to account for any fixed elements
                const offset = 80;
                const elementPosition = aboutSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Gentle parallax effect for sections (much more subtle than before)
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateParallax() {
        const currentScrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if section is in viewport
            if (currentScrollY > sectionTop - window.innerHeight && 
                currentScrollY < sectionTop + sectionHeight) {
                
                // Calculate parallax value - much more subtle now (0.05 instead of 0.3)
                const speed = 0.05;
                const yOffset = (currentScrollY - sectionTop) * speed;
                
                // Apply transform to section's children (only very small movement)
                const content = section.querySelector('.section-content');
                if (content && section.id !== 'hero') {
                    content.style.transform = `translateY(${yOffset}px)`;
                }
            }
        });
        
        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize project and timeline images with gradients
    function initGradients() {
        // Project images
        const projectImages = document.querySelectorAll('.project-image.placeholder');
        const projectColors = [
            'linear-gradient(135deg, #b2d8d8, #008080)',
            'linear-gradient(135deg, #8fd3f4, #5f4b8b)',
            'linear-gradient(135deg, #97d5c9, #007c91)'
        ];
        
        projectImages.forEach((img, index) => {
            img.style.background = projectColors[index % projectColors.length];
        });
        
        // Timeline images
        const timelineImages = document.querySelectorAll('.timeline-image.placeholder');
        const timelineColors = [
            'linear-gradient(135deg, #8fd3f4, #5f4b8b)',
            'linear-gradient(135deg, #b2d8d8, #008080)',
            'linear-gradient(135deg, #97d5c9, #007c91)',
            'linear-gradient(135deg, #8fd3f4, #5f4b8b)'
        ];
        
        timelineImages.forEach((img, index) => {
            img.style.background = timelineColors[index % timelineColors.length];
        });
        
        // Education logos
        const eduLogos = document.querySelectorAll('.edu-logo.placeholder');
        const eduColors = [
            'linear-gradient(135deg, #b2d8d8, #008080)',
            'linear-gradient(135deg, #8fd3f4, #5f4b8b)',
            'linear-gradient(135deg, #97d5c9, #007c91)'
        ];
        
        eduLogos.forEach((logo, index) => {
            logo.style.background = eduColors[index % eduColors.length];
        });
    }

    // Initialize all gradients
    initGradients();
    
    // Handle responsive behavior
    function handleResponsive() {
        const isMobile = window.innerWidth <= 768;
        const lastSection = document.querySelector('#education');
        
        if (lastSection) {
            // Add padding to the last section to ensure it doesn't get hidden behind the footer
            lastSection.style.paddingBottom = isMobile ? '70px' : 'var(--footer-height)';
        }
    }
    
    // Initial call for responsive handling
    handleResponsive();
    
    // Update on window resize
    window.addEventListener('resize', handleResponsive);
});