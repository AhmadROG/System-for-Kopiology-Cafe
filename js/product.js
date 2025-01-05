// Example menu data
const menuData = {
    popular: [
        { name: 'Espresso', description: 'Rich and bold coffee, perfect for your morning boost.' },
        { name: 'Croissant', description: 'Flaky and buttery pastry, a delightful treat.' }
    ],
    latte: [
        { name: 'Classic Latte', description: 'Smooth espresso with steamed milk.' },
        { name: 'Vanilla Latte', description: 'Latte with a hint of vanilla syrup.' }
    ],
    noncoffee: [
        { name: 'Iced Lemonade', description: 'Freshly squeezed lemonade served cold.' },
        { name: 'Iced Tea', description: 'Refreshing iced tea with a touch of mint.' }
    ],
    spaghetti: [
        { name: 'Spaghetti Bolognese', description: 'Classic spaghetti with a rich meat sauce.' },
        { name: 'Spaghetti Aglio Olio', description: 'Simple and flavorful garlic and olive oil pasta.' }
    ],
    western: [
        { name: 'Grilled Chicken', description: 'Tender chicken grilled to perfection.' },
        { name: 'Beef Steak', description: 'Juicy steak served with grilled vegetables.' }
    ],
    ricenoodle: [
        { name: 'Fried Rice', description: 'Stir-fried rice with vegetables and egg.' },
        { name: 'Noodles', description: 'Stir-fried noodles with a mix of veggies.' }
    ]
};

// Function to update the menu items
function updateMenu(category) {
    const menuItems = document.getElementById('menu-items');
    menuItems.innerHTML = ''; // Clear current menu items
    const items = menuData[category];

    if (items) {
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('menu-item');
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;
            menuItems.appendChild(itemElement);
        });
    }
}

// Event listener for category clicks
document.querySelectorAll('.category').forEach(categoryElement => {
    categoryElement.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        updateMenu(category); // Update menu items based on the selected category
        document.getElementById('menu-title').textContent = category.charAt(0).toUpperCase() + category.slice(1); // Update section title
    });
});

  
// Initial load for the "Popular" category
updateMenu('popular');

