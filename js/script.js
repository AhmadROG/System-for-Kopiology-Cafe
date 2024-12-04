const menuData = {
    // blh isi menu sini
    popular: [
        { name: "Chocolate", price: "RM 13.50", description: "Premium chocolate drink", image: "chocolate.jpg" },
        { name: "Spaghetti Shrimp Aglio Olio", price: "RM 20.25", description: "Spaghetti with shrimp in olive oil", image: "spaghetti.jpg" },
        { name: "Chicken Rice", price: "RM 15.00", description: "Classic chicken rice", image: "chicken-rice.jpg" },
        { name: "Latte", price: "RM 12.50", description: "Classic latte", image: "latte.jpg" },
        { name: "Macchiato", price: "RM 13.50", description: "Caramel macchiato", image: "macchiato.jpg" },
        { name: "Cappuccino", price: "RM 14.00", description: "Creamy cappuccino", image: "cappuccino.jpg" },
    ],
    latte: [
        { name: "Vanilla Latte", price: "RM 12.50", description: "Smooth vanilla latte", image: "vanilla-latte.jpg" },
        { name: "Caramel Latte", price: "RM 14.00", description: "Sweet caramel latte", image: "caramel-latte.jpg" },
        { name: "Hazelnut Latte", price: "RM 13.50", description: "Rich hazelnut latte", image: "hazelnut-latte.jpg" },
        { name: "Pumpkin Spice Latte", price: "RM 15.00", description: "Seasonal favorite", image: "pumpkin-spice-latte.jpg" },
        { name: "Mocha Latte", price: "RM 14.50", description: "Chocolate-infused latte", image: "mocha-latte.jpg" },
        { name: "Matcha Latte", price: "RM 16.00", description: "Green tea latte", image: "matcha-latte.jpg" },
    ],
    noncoffee: [
        { name: "Green Tea", price: "RM 10.00", description: "Refreshing green tea", image: "green-tea.jpg" },
        { name: "Iced Lemon Tea", price: "RM 8.50", description: "Zesty iced lemon tea", image: "iced-lemon-tea.jpg" },
        { name: "Hot Chocolate", price: "RM 12.00", description: "Creamy hot chocolate", image: "hot-chocolate.jpg" },
        { name: "Milkshake", price: "RM 14.00", description: "Classic vanilla milkshake", image: "milkshake.jpg" },
        { name: "Fruit Punch", price: "RM 9.00", description: "Refreshing fruit punch", image: "fruit-punch.jpg" },
    ],
    spaghetti: [
        { name: "Carbonara", price: "RM 20.00", description: "Creamy carbonara spaghetti", image: "carbonara.jpg" },
        { name: "Bolognese", price: "RM 18.00", description: "Rich bolognese spaghetti", image: "bolognese.jpg" },
        { name: "Pesto Pasta", price: "RM 22.00", description: "Basil pesto with spaghetti", image: "pesto-pasta.jpg" },
    ],
    western: [
        { name: "Chicken Chop", price: "RM 25.00", description: "Juicy grilled chicken chop", image: "chicken-chop.jpg" },
        { name: "Fish and Chips", price: "RM 22.50", description: "Crispy fish with fries", image: "fish-and-chips.jpg" },
        { name: "Grilled Lamb", price: "RM 35.00", description: "Tender grilled lamb", image: "grilled-lamb.jpg" },
    ],
    ricenoodle: [
        { name: "Fried Rice", price: "RM 12.00", description: "Classic fried rice with vegetables", image: "fried-rice.jpg" },
        { name: "Pad Thai", price: "RM 15.00", description: "Thai-style noodle stir-fry", image: "pad-thai.jpg" },
        { name: "Laksa", price: "RM 18.00", description: "Spicy noodle soup", image: "laksa.jpg" },
    ],
};

function loadMenu(category) {
    const menuTitle = document.getElementById("menu-title");
    const menuItemsContainer = document.getElementById("menu-items");

    menuTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);

    menuItemsContainer.innerHTML = "";

    const items = menuData[category];
    items.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.price}</p>
            <p>${item.description}</p>
        `;
        menuItemsContainer.appendChild(menuItem);
    });
}

document.querySelectorAll(".category").forEach((category) => {
    category.addEventListener("click", (e) => {
        document.querySelectorAll(".category").forEach((c) => c.classList.remove("active"));
        e.target.classList.add("active");

        const category = e.target.getAttribute("data-category");
        loadMenu(category);
    });
});

// Load the default category
loadMenu("popular");
