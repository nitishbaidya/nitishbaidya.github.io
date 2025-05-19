document.addEventListener('DOMContentLoaded', () => {
    // City data with coordinates and hover notes
    const cityData = [
        { 
            name: "London", 
            country: "United Kingdom", 
            lat: 51.5074, 
            lng: -0.1278,
            note: "I love the gloom. I miss the gloom. Great food, amazing pubs."
        },
        { 
            name: "Berlin", 
            country: "Germany", 
            lat: 52.5200, 
            lng: 13.4050,
            note: "People will stare at you if you ask for a chicken and cheese pizza. Also, I outdrank them easily."
        },
        { 
            name: "Gurgaon", 
            country: "India", 
            lat: 28.4595, 
            lng: 77.0266,
            note: "The actual land of opportunities."
        },
        { 
            name: "Mumbai", 
            country: "India", 
            lat: 19.0760, 
            lng: 72.8777,
            note: "The best folks anywhere. You cannot beat that."
        },
        { 
            name: "Bengaluru", 
            country: "India", 
            lat: 12.9716, 
            lng: 77.5946,
            note: "The hustle, the weather, the coffee."
        }
    ];
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
    
    // Initialize the map
    function initMap() {
        // Check if the map container exists
        const mapContainer = document.getElementById('citiesMap');
        if (!mapContainer) return;
        
        // Calculate optimal center and zoom level
        let avgLat = 0;
        let avgLng = 0;
        let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
        
        cityData.forEach(city => {
            avgLat += city.lat;
            avgLng += city.lng;
            
            // Track boundaries
            minLat = Math.min(minLat, city.lat);
            maxLat = Math.max(maxLat, city.lat);
            minLng = Math.min(minLng, city.lng);
            maxLng = Math.max(maxLng, city.lng);
        });
        
        avgLat /= cityData.length;
        avgLng /= cityData.length;
        
        // Create map options to disable interactive features
        const mapOptions = {
            center: [avgLat, avgLng],
            zoom: 2,
            dragging: false,      // Disable dragging
            touchZoom: false,     // Disable touch zoom
            scrollWheelZoom: false, // Disable scroll wheel zoom
            doubleClickZoom: false, // Disable double click zoom
            boxZoom: false,       // Disable box zoom
            zoomControl: false,   // Hide zoom controls
            attributionControl: true // Keep attribution
        };
        
        // Create map with dark theme
        const map = L.map('citiesMap', mapOptions);
        
        // Add dark theme tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        map.setView([30, 20], 2);
        
        // Create custom icon for markers
        function createCustomMarker(size) {
            return L.divIcon({
                className: 'city-marker',
                iconSize: [size, size],
                iconAnchor: [size/2, size/2]
            });
        }
        
        // Create label icon
        function createLabelIcon(labelText) {
            return L.divIcon({
                className: 'city-label',
                html: labelText,
                iconSize: [100, 20],
                iconAnchor: [-12, 10] // Shift label up and to the right of the marker
            });
        }
        
        // Create special label icon for London (positioned to the left)
        function createLeftLabelIcon(labelText) {
            return L.divIcon({
                className: 'city-label',
                html: labelText,
                iconSize: [100, 20],
                iconAnchor: [60, 10] // Position label further to the left of the marker
            });
        }

        // Add custom markers for each city
        cityData.forEach(city => {
            // Create tooltip content - only showing the note, no city name
            const tooltipContent = `<div class="city-tooltip"><p>${city.note}</p></div>`;
            
            // Create glowing marker with tooltip
            const marker = L.marker([city.lat, city.lng], {
                icon: createCustomMarker(10)
            })
            .bindTooltip(tooltipContent, {
                direction: 'top',
                permanent: false,
                className: 'city-note-tooltip',
                offset: [0, -30] // Move tooltip 30px further up
            })
            .addTo(map);
            
            // Add city label with special handling for London
            let labelMarker;
            if (city.name === "London") {
                // London gets left-positioned label
                labelMarker = L.marker([city.lat, city.lng], {
                    icon: createLeftLabelIcon(city.name),
                    zIndexOffset: -1000
                }).addTo(map);
            } else {
                // Other cities get regular right-positioned labels
                labelMarker = L.marker([city.lat, city.lng], {
                    icon: createLabelIcon(city.name),
                    zIndexOffset: -1000
                }).addTo(map);
            }
            
            // Also bind the tooltip to the label for better user experience
            labelMarker.bindTooltip(tooltipContent, {
                direction: 'top',
                permanent: false,
                className: 'city-note-tooltip',
                offset: [0, -30] // Move tooltip 30px further up
            });
        });
        
        // Make map responsive to container resizing
        window.addEventListener('resize', () => {
            map.invalidateSize();
            
            // Refit bounds after resize
            map.fitBounds([
                [minLat, minLng],
                [maxLat, maxLng]
            ], { padding: [50, 50] });
        });
        
        // Add map initialization to the main resize handler
        const originalHandleResponsive = handleResponsive;
        handleResponsive = () => {
            originalHandleResponsive();
            map.invalidateSize();
            
            // Refit bounds after resize
            map.fitBounds([
                [minLat, minLng],
                [maxLat, maxLng]
            ], { padding: [50, 50] });
        };
    }
    
    // Initialize map when document is loaded
    initMap();
});