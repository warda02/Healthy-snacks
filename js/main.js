// Featured Recipes Data
const featuredRecipes = [
    {
        title: "Healthy Trail Mix",
        category: "Healthy Snacks",
        image: "images/pexels-karolina-grabowska-4198017.jpg",
        prepTime: "5 minutes",
        servings: "4",
        calories: "150 per serving",
        ingredients: [
            "1 cup almonds",
            "1 cup cashews",
            "1/2 cup dried cranberries",
            "1/2 cup dark chocolate chips",
            "1/2 cup pumpkin seeds"
        ],
        instructions: [
            "Mix all ingredients in a large bowl",
            "Store in an airtight container",
            "Enjoy as needed!"
        ]
    },
    // Add more featured recipes here
];

// Load Featured Recipes
function loadFeaturedRecipes() {
    // Only load featured recipes on the home page
    if (!document.querySelector('.featured-recipes')) return;
    
    const recipeGrid = document.querySelector('.featured-recipes .recipe-grid');
    if (!recipeGrid) return;

    // Clear existing content only in featured recipes section
    recipeGrid.innerHTML = '';

    featuredRecipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="recipe-content">
                <h3>${recipe.title}</h3>
                <p>${recipe.category}</p>
                <div class="recipe-meta">
                    <span><i class="far fa-clock"></i> ${recipe.prepTime}</span>
                    <span><i class="fas fa-user-friends"></i> ${recipe.servings}</span>
                </div>
            </div>
        `;
        recipeGrid.appendChild(recipeCard);
    });
}

// Initialize Geolocation
function initMap() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            // Initialize Google Maps
            const mapElement = document.getElementById('map');
            if (mapElement) {
                const map = new google.maps.Map(mapElement, {
                    center: { lat: latitude, lng: longitude },
                    zoom: 15
                });

                // Add marker for current location
                new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: map,
                    title: "QuickSnacks Location"
                });
            }
        });
    }
}

// Search Functionality
function searchRecipes(query) {
    query = query.toLowerCase();
    return featuredRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query)
    );
}

// Form Validation
function validateContactForm(event) {
    const form = event.target;
    const email = form.querySelector('#email').value;
    const message = form.querySelector('#message').value;

    if (!email || !message) {
        alert('Please fill in all required fields');
        event.preventDefault();
        return false;
    }

    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        event.preventDefault();
        return false;
    }

    return true;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedRecipes();
    
    // Add contact form validation
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }
});

// Handle mobile navigation
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });
}
