// Pobranie elementów
const userIcon = document.querySelector(".user-icon");
const userDropdown = document.querySelector(".user-dropdown");
const loginPopup = document.getElementById("login-popup");
const registerPopup = document.getElementById("register-popup");

// Funkcja do przełączania klasy 'active' dla ikony użytkownika
userIcon.addEventListener("click", function (event) {
  // Zapobieganie propagacji kliknięcia, aby nie zamykać menu po kliknięciu na ikonę
  event.stopPropagation();

  // Przełączanie klasy 'active' na ikonie użytkownika
  userIcon.classList.toggle("active");

  // Przełączanie widoczności menu użytkownika
  if (userIcon.classList.contains("active")) {
    // Wyświetlenie dropdown menu z animacją
    userDropdown.style.opacity = "1";
    userDropdown.style.transform = "translateY(0)";
  } else {
    // Ukrycie dropdown menu z animacją
    userDropdown.style.opacity = "0";
    userDropdown.style.transform = "translateY(-20px)";
  }
});

// Funkcja otwierająca popup logowania po kliknięciu "ZALOGUJ"
document
  .querySelector(".user-dropdown ul li:nth-child(1)")
  .addEventListener("click", function () {
    loginPopup.style.display = "flex";
    registerPopup.style.display = "none"; // Ukryj popup rejestracji, jeśli jest otwarty
  });

// Funkcja otwierająca popup rejestracji po kliknięciu "ZAREJESTRUJ"
document
  .querySelector(".user-dropdown ul li:nth-child(2)")
  .addEventListener("click", function () {
    registerPopup.style.display = "flex";
    loginPopup.style.display = "none"; // Ukryj popup logowania, jeśli jest otwarty
  });

// Zamknięcie popupów przy kliknięciu na krzyżyk
document
  .getElementById("close-login-popup")
  .addEventListener("click", function () {
    loginPopup.style.display = "none";
  });

document
  .getElementById("close-register-popup")
  .addEventListener("click", function () {
    registerPopup.style.display = "none";
  });

// Funkcja do zamknięcia menu, gdy klikniesz gdziekolwiek poza nim
document.addEventListener("click", function (event) {
  // Zamknięcie menu użytkownika, jeśli kliknięto poza ikoną lub dropdown
  if (
    !userIcon.contains(event.target) &&
    !userDropdown.contains(event.target)
  ) {
    userIcon.classList.remove("active");
    userDropdown.style.opacity = "0";
    userDropdown.style.transform = "translateY(-20px)";
  }

  // Sprawdzenie, czy kliknięto w tło popupu, ale nie w zawartość
  if (
    (event.target.classList.contains("popup") || event.target === loginPopup) &&
    !event.target.closest(".popup-content")
  ) {
    // Zamknięcie popupu logowania, jeśli kliknięto w tło
    loginPopup.style.display = "none";
    // Zamknięcie popupu rejestracji, jeśli kliknięto w tło
    registerPopup.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  addDefaultAccount();
  checkLoginStatus();
});

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
      { name: "Buty", price: 200, id: 2 }
    ],
    cart: [],
    orderHistory: [
      {
        id: 1,
        date: "2023-01-01",
        amount: 100,
        items: [
          { name: "Sukienka", quantity: 1 },
          { name: "Buty", quantity: 2 }
        ]
      },
      {
        id: 2,
        date: "2023-01-01",
        amount: 200,
        items: [
          { name: "Sukienka", quantity: 2 },
          { name: "Buty", quantity: 3 }
        ]
      }
    ]
  };

  let users = getFromLocalStorage("users") || [];
  const userExists = users.some(user => user.email === defaultUser.email);

  if (!userExists) {
    users.push(defaultUser);
    saveToLocalStorage("users", users);
  }
}

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

document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const users = getFromLocalStorage("users") || [];
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    saveToLocalStorage("loggedInUser", user);
    alert("Login successful!");
    checkLoginStatus();
    document.getElementById("login-popup").style.display = "none";
  } else {
    alert("Invalid email or password!");
  }
});

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
    favorites: [],
    cart: [],
    orderHistory: []
  };

  let users = getFromLocalStorage("users") || [];
  users.push(user);
  saveToLocalStorage("users", users);

  alert("Registration successful!");
  document.getElementById("register-popup").style.display = "none";
  checkLoginStatus(); 
});

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  alert("Logout successful!");
  window.location.href = "index.html";
  checkLoginStatus(); 
});

document.getElementById("profile").addEventListener("click", function () {
  const loggedInUser = getFromLocalStorage("loggedInUser");
    if (!loggedInUser) {
      alert("Musisz być zalogowany, aby uzyskać dostęp do tej strony.");
    }else{
      window.location.href = "profile.html"; 
    } 
});

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}