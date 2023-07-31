const email = document.querySelector(".login-email");
const password = document.querySelector(".login-password");
const loginButton = document.querySelector(".login-button");
const loginErrorElement = document.querySelector(".form-error");

if (!localStorage.hasOwnProperty("users")) {
  window.location.href = "../signup/index.html";
}

if (!localStorage.hasOwnProperty("currentUser")) {
  localStorage.setItem("currentUser", "{}");
}

if (!localStorage.hasOwnProperty("token")) {
  localStorage.setItem("token", "");
}

const users = JSON.parse(localStorage.getItem("users"));
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

function isEmailValid(email) {
  const regex = /@/;
  return regex.test(email);
}

function redirectToShop() {
  setTimeout(() => {
    window.location.href = "../shop/index.html";
  }, 1000);
}

function emailExist(email) {
  let u = users.find((user) => user.email === email);
  if (u) {
    currentUser = u;
  }
  return u;
}

function passMatch(email, password) {
  return users.find((o) => {
    return o.email === email && o.password === password;
  });
}

function generateRandomString() {
  const randomBytes = new Uint8Array(16);
  window.crypto.getRandomValues(randomBytes);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < randomBytes.length; i++) {
    const randomIndex = randomBytes[i] % characters.length;
    randomString += characters[randomIndex];
  }

  return randomString;
}

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (!email.value || !password.value) {
    loginErrorElement.innerHTML = "Required Fields are missing!";
    loginErrorElement.style.display = "block";
  } else if (!isEmailValid(email.value)) {
    loginErrorElement.innerHTML = "Email is not in valid format";
    loginErrorElement.style.display = "block";
  } else if (!emailExist(email.value)) {
    loginErrorElement.innerHTML = "No user found. Please signup";
    loginErrorElement.style.display = "block";
  } else if (!passMatch(email.value, password.value)) {
    loginErrorElement.innerHTML = "Incorrect Password!";
    loginErrorElement.style.display = "block";
  } else {
    loginErrorElement.style.display = "none";
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("token", generateRandomString());
    loginErrorElement.style.color = "green";
    loginErrorElement.innerHTML = "Login Success";
    loginErrorElement.style.display = "block";
    redirectToShop();
  }
});
