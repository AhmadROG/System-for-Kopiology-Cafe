document.addEventListener("DOMContentLoaded", () => {
    let cart = []; // Array to store cart items
  
    // Function to update the cart UI
    function updateCart() {
      const cartList = document.getElementById("cart-list");
      const cartTotal = document.getElementById("cart-total");
      cartList.innerHTML = ""; // Clear previous cart items
  
      if (cart.length === 0) {
        cartTotal.textContent = "Total: RM 0.00";
        return;
      }
  
      let total = 0;
      cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - RM ${item.price.toFixed(2)}`;
        cartList.appendChild(listItem);
        total += item.price;
      });
  
      cartTotal.textContent = `Total: RM ${total.toFixed(2)}`;
    }
  
    // Add event listeners to all product images
    document.querySelectorAll(".product-image").forEach(image => {
      image.addEventListener("click", () => {
        const productName = image.getAttribute("data-product");
        const productPrice = parseFloat(image.getAttribute("data-price"));
  
        // Add product to the cart
        cart.push({ name: productName, price: productPrice });
  
        alert(`${productName} has been added to the cart!`);
        updateCart();
      });
    });
  
    // Handle cart submission
    document.getElementById("submit-cart").addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty! Please add items before submitting.");
        return;
      }
  
      let orderSummary = "Your Order Summary:\n\n";
      cart.forEach(item => {
        orderSummary += `${item.name}: RM ${item.price.toFixed(2)}\n`;
      });
  
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      orderSummary += `\nTotal: RM ${total.toFixed(2)}`;
  
      alert(orderSummary);
  
      cart = []; // Clear the cart after submission
      updateCart();
    });
  });
  