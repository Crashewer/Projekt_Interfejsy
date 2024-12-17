// Pobranie elementów
addDefaultAccount();
checkLoginStatus();
updateCartCount();

// Elementy do obsługi użytkownika
const userIcon = document.querySelector(".user-icon");
const userDropdown = document.querySelector(".user-dropdown");
const loginPopup = document.getElementById("login-popup");
const registerPopup = document.getElementById("register-popup");

// Funkcja do przełączania klasy 'active' dla ikony użytkownika
userIcon.addEventListener("click", function (event) {
  event.stopPropagation();
  userIcon.classList.toggle("active");

  if (userIcon.classList.contains("active")) {
    userDropdown.style.opacity = "1";
    userDropdown.style.transform = "translateY(0)";
  } else {
    userDropdown.style.opacity = "0";
    userDropdown.style.transform = "translateY(-20px)";
  }
});

// Funkcja otwierająca popup logowania po kliknięciu "ZALOGUJ"
document.querySelector(".user-dropdown ul li:nth-child(1)").addEventListener("click", function () {
  loginPopup.style.display = "flex";
  registerPopup.style.display = "none"; // Ukryj popup rejestracji
});

// Funkcja otwierająca popup rejestracji po kliknięciu "ZAREJESTRUJ"
document.querySelector(".user-dropdown ul li:nth-child(2)").addEventListener("click", function () {
  registerPopup.style.display = "flex";
  loginPopup.style.display = "none"; // Ukryj popup logowania
});

// Zamknięcie popupów przy kliknięciu na krzyżyk
document.getElementById("close-login-popup").addEventListener("click", function () {
  loginPopup.style.display = "none";
});

document.getElementById("close-register-popup").addEventListener("click", function () {
  registerPopup.style.display = "none";
});

// Funkcja do zamknięcia menu, gdy klikniesz gdziekolwiek poza nim
document.addEventListener("click", function (event) {
  if (!userIcon.contains(event.target) && !userDropdown.contains(event.target)) {
    userIcon.classList.remove("active");
    userDropdown.style.opacity = "0";
    userDropdown.style.transform = "translateY(-20px)";
  }

  if ((event.target.classList.contains("popup") || event.target === loginPopup) && !event.target.closest(".popup-content")) {
    loginPopup.style.display = "none";
    registerPopup.style.display = "none";
  }
});

// Funkcja aktualizująca liczbę elementów w koszyku
function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  const loggedInUser = getFromLocalStorage("loggedInUser");
  let count = 0;

  if (loggedInUser && loggedInUser.cart) {
    count = loggedInUser.cart.reduce((total, item) => total + item.quantity, 0);
  }

  if (count === 0) {
    cartCountElement.style.display = "none";
  } else {
    cartCountElement.textContent = count;
    cartCountElement.style.display = "block";
  }
}

// Funkcja do dodawania domyślnego użytkownika
function addDefaultAccount() {
  const defaultUser = {
    email: "test@gmail.com",
    password: "test",
    firstName: "Test",
    lastName: "User",
    address: "123 Test St",
    city: "Test City",
    zipcode: "12345",
    watchlist: [
      { name: "Sukienka", price: 150, id: 1 },
      { name: "Buty", price: 200, id: 2 },
    ],
    cart: [
      { name: "Sukienka", price: 150, quantity: 1 },
      { name: "Buty", price: 200, quantity: 2 },
    ],
    orderHistory: [
      {
        id: 1,
        date: "2023-01-01",
        amount: 100,
        items: [
          { name: "Sukienka", quantity: 1 },
          { name: "Buty", quantity: 2 },
        ],
      },
      {
        id: 2,
        date: "2023-01-01",
        amount: 200,
        items: [
          { name: "Sukienka", quantity: 2 },
          { name: "Buty", quantity: 3 },
        ],
      },
    ],
  };

  let users = getFromLocalStorage("users") || [];
  const userExists = users.some((user) => user.email === defaultUser.email);

  if (!userExists) {
    users.push(defaultUser);
    saveToLocalStorage("users", users);
  }
}

// Funkcja sprawdzająca status logowania
function checkLoginStatus() {
  const loggedInUser = getFromLocalStorage("loggedInUser");

  if (loggedInUser) {
    document.querySelector(".user-dropdown li:nth-child(1)").style.display = "none"; // Hide "ZALOGUJ"
    document.querySelector(".user-dropdown li:nth-child(2)").style.display = "none"; // Hide "ZAREJESTRUJ"
    document.querySelector(".user-dropdown li:nth-child(3)").style.display = "block"; // Show "PROFIL"
    document.querySelector(".user-dropdown li:nth-child(4)").style.display = "block"; // Show "WYLOGUJ"
  } else {
    document.querySelector(".user-dropdown li:nth-child(1)").style.display = "block"; // Show "ZALOGUJ"
    document.querySelector(".user-dropdown li:nth-child(2)").style.display = "block"; // Show "ZAREJESTRUJ"
    document.querySelector(".user-dropdown li:nth-child(3)").style.display = "none"; // Hide "PROFIL"
    document.querySelector(".user-dropdown li:nth-child(4)").style.display = "none"; // Hide "WYLOGUJ"
  }
}

// Funkcja do logowania
document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const users = getFromLocalStorage("users") || [];
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    saveToLocalStorage("loggedInUser", user);
    alert("Login successful!");
    checkLoginStatus();
    document.getElementById("login-popup").style.display = "none";
    updateCartCount();
  } else {
    alert("Invalid email or password!");
  }
});

// Funkcja do rejestracji użytkownika
document.getElementById("register-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const firstName = document.getElementById("register-first-name").value;
  const lastName = document.getElementById("register-last-name").value;
  const address = document.getElementById("register-address").value;
  const city = document.getElementById("register-city").value;
  const zipcode = document.getElementById("register-zipcode").value;

  const user = {
    email,
    password,
    firstName,
    lastName,
    address,
    city,
    zipcode,
    watchlist: [],
    cart: [],
    orderHistory: [],
  };

  let users = getFromLocalStorage("users") || [];
  users.push(user);
  saveToLocalStorage("users", users);

  alert("Registration successful!");
  document.getElementById("register-popup").style.display = "none";
  checkLoginStatus();
});

// Funkcja do wylogowania
document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  alert("Logout successful!");
  window.location.href = "index.html";
  checkLoginStatus();
});

// Funkcja do przejścia do profilu
document.getElementById("profile").addEventListener("click", function () {
  const loggedInUser = getFromLocalStorage("loggedInUser");
  if (!loggedInUser) {
    alert("Musisz być zalogowany, aby uzyskać dostęp do tej strony.");
  } else {
    window.location.href = "profile.html";
  }
});

// Funkcja do zapisania danych w Local Storage
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Funkcja do pobierania danych z Local Storage
function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Funkcja do obsługi wyszukiwania
document.getElementById("search-button").addEventListener("click", function () {
  const searchInput = document.getElementById("search-input").value.trim();

  if (searchInput) {
    window.location.href = `../sites/searching.html?q=${encodeURIComponent(searchInput)}`;
  } else {
    alert("Wprowadź frazę do wyszukiwania.");
  }
});

document.getElementById("search-input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const searchInput = document.getElementById("search-input").value.trim();
    if (searchInput) {
      window.location.href = `../sites/searching.html?q=${encodeURIComponent(searchInput)}`;
    } else {
      alert("Wprowadź frazę do wyszukiwania.");
    }
  }
});
