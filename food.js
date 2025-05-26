// script.js

let cart = [];

function addToCart(itemName, itemPrice) {
  cart.push({ name: itemName, price: itemPrice });
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart");
  const totalSpan = document.getElementById("total");
  cartList.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      updateCart();
    };
    li.appendChild(removeBtn);
    cartList.appendChild(li);
    total += item.price;
  });

  totalSpan.textContent = total;
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderDetails = {
    id: Date.now(),
    items: cart,
    status: "pending"
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(orderDetails);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order placed successfully!");
  cart = [];
  updateCart();
}

document.addEventListener("DOMContentLoaded", updateCart);
