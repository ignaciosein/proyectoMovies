document.getElementById("goToRegister").addEventListener("click", () => {
  document.getElementById("divLogin").style.display = "none";
  document.getElementById("divSignUp").style.display = "block";
});

document.getElementById("goToLogin").addEventListener("click", () => {
  document.getElementById("divLogin").style.display = "block";
  document.getElementById("divSignUp").style.display = "none";
});
