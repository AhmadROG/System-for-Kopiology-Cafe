const menuData = {
    // blh isi menu sini
    popular: [
        { name: "Chocolate", price: "RM 13.50", description: "Premium chocolate drink", image: "images/chocolate.jpg" },
        { name: "Spaghetti Shrimp Aglio Olio", price: "RM 20.25", description: "Spaghetti with shrimp in olive oil", image: "images/spaghetti shrimp aglio olio.jpg" },
        { name: "Chicken Rice", price: "RM 15.00", description: "Classic chicken rice", image: "images/chicken rice.jpg" },
        { name: "Latte", price: "RM 12.50", description: "Classic latte", image: "images/latte.jpg" },
        { name: "Macchiato", price: "RM 13.50", description: "Caramel macchiato", image: "images/macchiato.jpg" },
        { name: "Cappuccino", price: "RM 14.00", description: "Creamy cappuccino", image: "images/cappuccino.jpg" },
    ],
    latte: [
        { name: "Vanilla Latte", price: "RM 12.50", description: "Smooth vanilla latte", image: "images/vanilla latte.jpg" },
        { name: "Caramel Latte", price: "RM 14.00", description: "Sweet caramel latte", image: "images/caramel latte.jpg" },
        { name: "Hazelnut Latte", price: "RM 13.50", description: "Rich hazelnut latte", image: "images/hazelnut latte.jpg" },
        { name: "Pumpkin Spice Latte", price: "RM 15.00", description: "Seasonal favorite", image: "images/pumpkin spice latte.jpg" },
        { name: "Mocha Latte", price: "RM 14.50", description: "Chocolate-infused latte", image: "images/mocha latte.jpg" },
        { name: "Matcha Latte", price: "RM 16.00", description: "Green tea latte", image: "images/matcha latte.jpg" },
    ],
    noncoffee: [
        { name: "Green Tea", price: "RM 10.00", description: "Refreshing green tea", image: "images/green tea.jpg" },
        { name: "Iced Lemon Tea", price: "RM 8.50", description: "Zesty iced lemon tea", image: "images/iced lemon tea.jpg" },
        { name: "Hot Chocolate", price: "RM 12.00", description: "Creamy hot chocolate", image: "images/hot chocolate.jpg" },
        { name: "Milkshake", price: "RM 14.00", description: "Classic vanilla milkshake", image: "images/milkshake.jpg" },
        { name: "Fruit Punch", price: "RM 9.00", description: "Refreshing fruit punch", image: "images/fruit punch.jpg" },
    ],
    spaghetti: [
        { name: "Carbonara", price: "RM 20.00", description: "Creamy carbonara spaghetti", image: "images/carbonara.jpg" },
        { name: "Bolognese", price: "RM 18.00", description: "Rich bolognese spaghetti", image: "images/bolognese.jpg" },
        { name: "Pesto Pasta", price: "RM 22.00", description: "Basil pesto with spaghetti", image: "images/pesto pasta.jpg" },
    ],
    western: [
        { name: "Chicken Chop", price: "RM 25.00", description: "Juicy grilled chicken chop", image: "images/chicken chop.jpg" },
        { name: "Fish and Chips", price: "RM 22.50", description: "Crispy fish with fries", image: "images/fish and chips.jpg" },
        { name: "Grilled Lamb", price: "RM 35.00", description: "Tender grilled lamb", image: "images/grilled lamb.jpg" },
    ],
    ricenoodle: [
        { name: "Fried Rice", price: "RM 12.00", description: "Classic fried rice with vegetables", image: "images/fried rice.jpg" },
        { name: "Pad Thai", price: "RM 15.00", description: "Thai-style noodle stir-fry", image: "images/pad thai.jpg" },
        { name: "Laksa", price: "RM 18.00", description: "Spicy noodle soup", image: "images/laksa.jpg" },
    ],
};

// Fungsi Papar Menu
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
           <button onclick="addToCart('${item.name}', '${item.price}', '${category}')">Add to Cart</button>
        `;
        menuItemsContainer.appendChild(menuItem);
    });
}

// Kategori Menu
document.querySelectorAll(".category").forEach((category) => {
    category.addEventListener("click", (e) => {
        document.querySelectorAll(".category").forEach((c) => c.classList.remove("active"));
        e.target.classList.add("active");

        const category = e.target.getAttribute("data-category");
        loadMenu(category);
    });
});

loadMenu("popular");

// Troli disimpan dalam LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Fungsi Tambah Item
function addToCart(itemName, itemPrice, itemCategory) {
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: parseFloat(itemPrice.replace("RM ", "")),
            category: itemCategory,
            quantity: 1
        });
    }

    saveCart();
    alert(`${itemName} has been added to cart.`);
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Papar Troli
function showCart() {
    const cartPopup = document.getElementById("cart-popup");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "RM 0.00";
    } else {
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <p>${item.name} (${item.category}) x ${item.quantity} - RM ${(item.price * item.quantity).toFixed(2)}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });

        cartTotal.textContent = `RM ${total.toFixed(2)}`;
    }

    cartPopup.style.display = "block";
}

// Tutup Paparan Troli
function closeCart() {
    document.getElementById("cart-popup").style.display = "none";
}

// Hapus Item dalam Troli
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    showCart();
}

// Fungsi Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let total = 0;
    let earnedPoints = 0;

    cart.forEach(item => {
        total += item.price;

        // Tambah points berdasarkan kategori
        if (item.category === 'latte' || item.category === 'noncoffee' || item.category === 'popular' && item.name.includes("Latte") || item.name.includes("Chocolate") || item.name.includes("Macchiato") || item.name.includes("Cappuccino")) {
            earnedPoints += 10 * item.quantity; // Minuman
        } else {
            earnedPoints += 15 * item.quantity; // Makanan
        }
    });

    totalPoints += earnedPoints;
    updatePointsDisplay();

    alert(`Payment amount: RM ${total.toFixed(2)}.You earn ${earnedPoints} points!`);

    cart = [];
    saveCart();
    updateCartCount();
    closeCart();
}


// Inisialisasi points dari localStorage
let totalPoints = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;

// Kemas kini paparan points di navbar dan pop-up
function updatePointsDisplay() {
    document.getElementById('points-total').textContent = totalPoints;
    document.getElementById('display-points').textContent = totalPoints;
    localStorage.setItem('points', totalPoints);  // ✅ Simpan points ke localStorage
}

// Buka dan tutup pop-up points
document.getElementById('view-points-btn').addEventListener('click', () => {
    document.getElementById('points-popup').style.display = 'block';
    updatePointsDisplay();
});

// Fungsi untuk paparkan pilihan tebusan
function showRedeemOptions(category) {
    const redeemItemsContainer = document.getElementById('redeem-items');
    redeemItemsContainer.innerHTML = '';  // Kosongkan paparan sebelum ini

    const items = menuData[category];
    items.forEach((item) => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('redeem-item-card');

        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h5>${item.name}</h5>
            <p>${item.description}</p>
            <button class="redeem-btn">Claim ${item.name}</button>
        `;

        itemCard.querySelector('.redeem-btn').onclick = function() {
            alert(`${item.name} has been successfully redeemed!`);
            document.getElementById('redeem-selection').style.display = 'none';
        };

        redeemItemsContainer.appendChild(itemCard);
    });

    document.getElementById('redeem-selection').style.display = 'block';
}

// Fungsi Tebus Minuman Percuma
document.getElementById('redeem-drink-btn').addEventListener('click', () => {
    if (totalPoints >= 1000) {
        totalPoints -= 1000;
        updatePointsDisplay();
        document.getElementById('points-message').textContent = "Free drinks successfully redeemed!";
        showRedeemOptions('noncoffee');  // Paparkan pilihan minuman
    } else {
        document.getElementById('points-message').textContent = "Points are not enough to redeem drinks.";
    }
});

// Fungsi Tebus Makanan Percuma
document.getElementById('redeem-food-btn').addEventListener('click', () => {
    if (totalPoints >= 2000) {
        totalPoints -= 2000;
        updatePointsDisplay();
        document.getElementById('points-message').textContent = "Free food successfully redeemed!";
        showRedeemOptions('western');  // Paparkan pilihan makanan
    } else {
        document.getElementById('points-message').textContent = "Points are not enough to redeem food.";
    }
});


// Tebus makanan percuma
document.getElementById('redeem-food-btn').addEventListener('click', () => {
    if (totalPoints >= 2000) {
        totalPoints -= 2000;
        updatePointsDisplay();
        document.getElementById('points-message').textContent = "Free food successfully redeemed! Please select food.";
        showRedeemOptions('western'); // Paparkan pilihan makanan
    } else {
        document.getElementById('points-message').textContent = "Points are not enough to redeem food.";
    }
});

function closePoints() {
    document.getElementById('points-popup').style.display = 'none';
}

// Fungsi Tebus Minuman Percuma
document.getElementById('redeem-drink-btn').addEventListener('click', () => {
    if (totalPoints >= 1000) {
        totalPoints -= 1000;
        updatePointsDisplay();
        document.getElementById('points-message').textContent = "Go claim your free drink!";
        showRedeemOptions('noncoffee');  // Paparkan pilihan minuman
    } else {
        document.getElementById('points-message').textContent = "Not enough points to redeem a drink.";
    }
});

// Fungsi Tebus Makanan Percuma
document.getElementById('redeem-food-btn').addEventListener('click', () => {
    if (totalPoints >= 2000) {
        totalPoints -= 2000;
        updatePointsDisplay();
        document.getElementById('points-message').textContent = "Go claim your free food!";
        showRedeemOptions('western');  // Paparkan pilihan makanan
    } else {
        document.getElementById('points-message').textContent = "Not enough points to redeem food.";
    }
});

// Kemas kini points semasa
updatePointsDisplay();


// Event Listener untuk Butang View Cart
document.getElementById("view-cart-btn").addEventListener("click", showCart);
document.getElementById("close-cart-btn").addEventListener("click", closeCart);
document.getElementById("checkout-btn").addEventListener("click", checkout);
document.addEventListener("DOMContentLoaded", updatePointsDisplay);

// Paparkan jumlah item selepas reload
updateCartCount();
