document.addEventListener("DOMContentLoaded", () => {
  let selectedSize = null;
  let selectedColor = null;
  let quantity = 1;

  // Funkcja do pobierania parametru z URL
  function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // Pobranie ID produktu z URL
  const productID = getQueryParameter("id");

  // Elementy do manipulacji na stronie
  const sizeElements = document.querySelectorAll(".size");
  const quantityMinus = document.querySelector(".quantity button:first-child");
  const quantityPlus = document.querySelector(".quantity button:last-child");
  const quantityDisplay = document.querySelector(".quantity span");
  const addToCartButton = document.querySelector(".add-to-cart");

  // Pobranie produktów z pliku JSON
  function loadProducts() {
    return fetch("../jsons/products.json")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Błąd ładowania produktów:", error);
        return [];
      });
  }

  // Funkcja do wyświetlania produktu na stronie
  function displayProduct(product) {
    // Zmieniamy tytuł strony na nazwę produktu
    document.getElementById("page-title").textContent = product.name;

    // Zmieniamy nazwę produktu
    document.getElementById("product-name").textContent = product.name;

    // Zmieniamy kod produktu
    document.getElementById("product-code").textContent = product.product_code;

    // Zmieniamy cenę produktu
    document.getElementById("product-price").textContent = `${product.price} zł`;

    // Zmieniamy opis produktu
    document.getElementById("product-description").textContent = product.description || 'Brak opisu';

    // Zmieniamy zdjęcia produktu
    document.getElementById("main-img").src = `../img/products/product${product.id}/${product.main_img}`;
    document.getElementById("main-img").alt = product.name;
    document.getElementById("front-img").src = `../img/products/product${product.id}/${product.front_img}`;
    document.getElementById("back-img").src = `../img/products/product${product.id}/${product.back_img}`;
    document.getElementById("model-img").src = `../img/products/product${product.id}/${product.model_img}`;

    // Wyświetlamy dostępne kolory
    const colorOptionsContainer = document.getElementById("color-options");
    colorOptionsContainer.innerHTML = ""; // Czyścimy poprzednie kolory
    product.available_colors.forEach((color) => {
      const colorOption = document.createElement("span");
      colorOption.className = `color ${color}`;
      colorOptionsContainer.appendChild(colorOption);
    });

    // Aktywujemy tylko dostępne rozmiary
    const sizeOptionsContainer = document.getElementById("size-options");
    sizeElements.forEach((sizeElement) => {
      const size = sizeElement.textContent.trim();
      if (product.available_sizes.includes(size)) {
        sizeElement.classList.add("available");
        sizeElement.classList.remove("unavailable");
      } else {
        sizeElement.classList.add("unavailable");
        sizeElement.classList.remove("available");
      }
    });

    // Funkcja zaznaczania koloru
    const colorElements = document.querySelectorAll(".color");
    colorElements.forEach((color) => {
      color.addEventListener("click", () => {
        // Usunięcie zaznaczenia z innych kolorów
        colorElements.forEach((c) => c.classList.remove("selected"));
        // Zaznaczenie wybranego koloru
        color.classList.add("selected");
        selectedColor = color.classList[1]; // Aktualizacja zmiennej (klasa koloru)
      });
    });
  }

  // Funkcja zaznaczania rozmiaru
  function handleSizeSelection() {
    sizeElements.forEach((size) => {
      size.addEventListener("click", () => {
        if (size.classList.contains("available")) {
          sizeElements.forEach((s) => s.classList.remove("selected"));
          size.classList.add("selected");
          selectedSize = size.textContent.trim();
        }
      });
    });
  }

  // Funkcja zmniejszania ilości
  function handleQuantityChange() {
    quantityMinus.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
      }
    });

    quantityPlus.addEventListener("click", () => {
      quantity++;
      quantityDisplay.textContent = quantity;
    });
  }

  // Funkcja dodawania do koszyka
  function handleAddToCart() {
    addToCartButton.addEventListener("click", () => {
      if (!selectedSize || !selectedColor) {
        alert("Wybierz rozmiar i kolor przed dodaniem do koszyka.");
        return;
      }

      const purchase = {
        id: productID,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
      };

      let cart = JSON.parse(localStorage.getItem("koszyk")) || [];
      cart.push(purchase);
      localStorage.setItem("koszyk", JSON.stringify(cart));

      alert("Produkt dodany do koszyka!");
    });
  }

  // Ładujemy dane o produkcie i wyświetlamy je na stronie
  loadProducts()
    .then((products) => {
      const product = products.find(p => p.id == productID);
      if (product) {
        displayProduct(product);
        handleSizeSelection();
        handleQuantityChange();
        handleAddToCart();
      } else {
        console.error("Produkt o podanym ID nie istnieje!");
      }
    })
    .catch((error) => {
      console.error("Błąd podczas ładowania danych produktu:", error);
    });
});
