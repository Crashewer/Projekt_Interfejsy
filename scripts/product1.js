document.addEventListener("DOMContentLoaded", () =>
{
  let selectedSize = null;
  let selectedColor = null;
  let quantity = 1;

  const productID = 1;

  const sizeElements = document.querySelectorAll(".size.available");
  const colorElements = document.querySelectorAll(".color");
  const quantityMinus = document.querySelector(".quantity button:first-child");
  const quantityPlus = document.querySelector(".quantity button:last-child");
  const quantityDisplay = document.querySelector(".quantity span");
  const addToCartButton = document.querySelector(".add-to-cart");

  sizeElements.forEach((size) => {
    size.addEventListener("click", () => {
      // Usunięcie zaznaczenia z innych rozmiarów
      sizeElements.forEach((s) => s.classList.remove("selected"));
      // Zaznaczenie wybranego rozmiaru
      size.classList.add("selected");
      selectedSize = size.textContent; // Aktualizacja zmiennej
    });
  });

  // Funkcja zaznaczania koloru
  colorElements.forEach((color) => {
    color.addEventListener("click", () => {
      // Usunięcie zaznaczenia z innych kolorów
      colorElements.forEach((c) => c.classList.remove("selected"));
      // Zaznaczenie wybranego koloru
      color.classList.add("selected");
      selectedColor = color.classList[1]; // Aktualizacja zmiennej (klasa koloru)
    });
  });

  // Funkcja zmniejszania ilości
  quantityMinus.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  });

  // Funkcja zwiększania ilości
  quantityPlus.addEventListener("click", () => {
    quantity++;
    quantityDisplay.textContent = quantity;
  });

  // Funkcja dodawania do koszyka
  addToCartButton.addEventListener("click", () => {
    if (!selectedSize || !selectedColor) {
      alert("Wybierz rozmiar i kolor przed dodaniem do koszyka.");
      return;
    }

    // Tworzenie obiektu dla pojedynczego zakupu
    const purchase = {
      id: productID,
      ilosc: quantity,
      rozmiar: selectedSize,
      kolor: selectedColor,
    };

    // Pobranie aktualnego koszyka z LocalStorage (jeśli istnieje)
    let cart = JSON.parse(localStorage.getItem("koszyk")) || [];

    // Dodanie zakupu do koszyka
    cart.push(purchase);

    // Zapisanie koszyka do LocalStorage
    localStorage.setItem("koszyk", JSON.stringify(cart));

    alert("Produkt dodany do koszyka!");
  });
});
