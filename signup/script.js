const firstName = document.querySelector(".signup-firstname");
const lastName = document.querySelector(".signup-lastname");
const email = document.querySelector(".signup-email");
const password = document.querySelector(".signup-password");
const confirmPassword = document.querySelector(".signup-confirm-password");
const signupButton = document.querySelector(".signup-button");
const errorElement = document.querySelector(".form-error");

if (!localStorage.hasOwnProperty("users")) {
  localStorage.setItem("users", "[]");
}

const users = JSON.parse(localStorage.getItem("users"));

const user = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function isEmailValid(email) {
  const regex = /@/;
  return regex.test(email);
}

function redirectToLogin() {
  setTimeout(() => {
    window.location.href = "../login/index.html";
  }, 1000);
}

function emailExist(email) {
  return users.find((user) => user.email === email);
}

signupButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    errorElement.innerHTML = "Required Fields are missing!";
    errorElement.style.display = "block";
  } else if (!isEmailValid(email.value)) {
    errorElement.innerHTML = "Email is not in valid format";
    errorElement.style.display = "block";
  } else if (password.value !== confirmPassword.value) {
    errorElement.innerHTML = "Password doesn't match";
    errorElement.style.display = "block";
  } else if (emailExist(email.value)) {
    errorElement.innerHTML = "Email already exists!, please login.";
    errorElement.style.display = "block";
  } else {
    errorElement.style.display = "none";
    user.firstName = firstName.value;
    user.lastName = lastName.value;
    user.email = email.value;
    user.password = password.value;
    user.confirmPassword = confirmPassword.value;
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    errorElement.innerHTML = "Singup Success";
    errorElement.style.color = "green";
    errorElement.style.display = "block";
    redirectToLogin();
  }
});
