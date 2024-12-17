// Zmienne do przechowywania aktualnie wybranego koloru, rozmiaru i ilości
let selectedColor = null;
let selectedSize = null;
let productQuantity = 1;

// Funkcja do inicjalizacji interakcji na stronie
function initProductPage() {
  // Dodaj event listener do rozmiarów
  const sizeElements = document.querySelectorAll('.size.available');
  sizeElements.forEach(size => {
    size.addEventListener('click', function() {
      // Zaznacz wybrany rozmiar
      selectSize(size);
    });
  });

  // Dodaj event listener do kolorów
  const colorElements = document.querySelectorAll('.color');
  colorElements.forEach(color => {
    color.addEventListener('click', function() {
      // Zaznacz wybrany kolor
      selectColor(color);
    });
  });

  // Dodaj event listener do przycisków ilości
  const quantityMinus = document.querySelector('.quantity button:first-child');
  const quantityPlus = document.querySelector('.quantity button:last-child');

  quantityMinus.addEventListener('click', function() {
    if (productQuantity > 1) {
      productQuantity--;
      updateQuantityDisplay();
    }
  });

  quantityPlus.addEventListener('click', function() {
    productQuantity++;
    updateQuantityDisplay();
  });

  // Zaktualizuj wyświetlanie początkowej ilości
  updateQuantityDisplay();
}

// Funkcja do zaznaczenia rozmiaru
function selectSize(sizeElement) {
  // Zresetuj zaznaczenie poprzedniego rozmiaru
  const previousSelectedSize = document.querySelector('.size.selected');
  if (previousSelectedSize) {
    previousSelectedSize.classList.remove('selected');
  }

  // Zaznacz nowy rozmiar
  sizeElement.classList.add('selected');
  selectedSize = sizeElement.textContent; // Przypisz wybrany rozmiar
  console.log('Wybrany rozmiar:', selectedSize);
}

// Funkcja do zaznaczenia koloru
function selectColor(colorElement) {
  // Zresetuj zaznaczenie poprzedniego koloru
  const previousSelectedColor = document.querySelector('.color.selected');
  if (previousSelectedColor) {
    previousSelectedColor.classList.remove('selected');
  }

  // Zaznacz nowy kolor
  colorElement.classList.add('selected');
  selectedColor = colorElement.style.backgroundColor; // Przypisz wybrany kolor
  console.log('Wybrany kolor:', selectedColor);
}

// Funkcja do zaktualizowania wyświetlanej ilości
function updateQuantityDisplay() {
  const quantityDisplay = document.querySelector('.quantity span');
  if (quantityDisplay) {
    quantityDisplay.textContent = productQuantity;
  }
}

// Uruchomienie funkcji inicjalizującej po załadowaniu strony
document.addEventListener('DOMContentLoaded', function() {
  initProductPage();
});
