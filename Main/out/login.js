document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  const registerBtn = document.getElementById("register");
  const loginBtn = document.getElementById("login");

  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  });

  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });

  function triggerConfetti() {
    const confettiContainer = document.getElementById("confetti");
    confettiContainer.classList.add("active");

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("span");
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.background = ["#512da8", "#5c6bc0", "#ff4081", "#4caf50"][
        Math.floor(Math.random() * 4)
      ];
      confetti.style.animationDelay = Math.random() * 2 + "s";
      confettiContainer.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }

    setTimeout(() => confettiContainer.classList.remove("active"), 3000);
  }

  // Động placeholder dựa trên loại tài khoản
  const accountTypeSelect = document.getElementById("account-type");
  const emailOrUsernameInput = document.getElementById("email-or-username");

  accountTypeSelect.addEventListener("change", function () {
    if (this.value === "user") {
      emailOrUsernameInput.placeholder = "Email";
    } else {
      emailOrUsernameInput.placeholder = "Username";
    }
  });

  // ====== SIGN UP ======
  const signUpButton = document.querySelector(".sign-up button");
  signUpButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const name = document.querySelector(".sign-up input[type='text']").value;
    const email = document.querySelector(".sign-up input[type='email']").value;
    const password = document.querySelector(
      ".sign-up input[type='password']"
    ).value;

    if (!name || !email || !password) {
      alert("Vui lòng nhập đầy đủ tên, email và mật khẩu!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Đăng ký thành công!");
        triggerConfetti();
        container.classList.remove("active");
      } else {
        alert(data.error || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      alert("Lỗi hệ thống! Vui lòng thử lại sau.");
    }
  });

  // ====== SIGN IN ======
  const signInButton = document.querySelector(".sign-in button");
  signInButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const accountType = document.getElementById("account-type").value;
    const emailOrUsername = document
      .getElementById("email-or-username")
      .value.trim()
      .toLowerCase();
    const password = document.querySelector(
      ".sign-in input[type='password']"
    ).value;

    if (!emailOrUsername || !password) {
      alert("Vui lòng nhập đầy đủ email/tên người dùng và mật khẩu!");
      return;
    }

    let loginUrl = "";
    let body = {};

    if (accountType === "user") {
      loginUrl = "http://localhost:3000/api/user/login";
      body = { email: emailOrUsername, password };
    } else if (accountType === "admin") {
      loginUrl = "http://localhost:3000/api/admin/login";
      // Nếu nhập email mặc định của admin, tự động chuyển thành username "admin"
      const username =
        emailOrUsername === "huymt0401@gmail.com" ? "admin" : emailOrUsername;
      body = { username, password };
    }

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Đăng nhập thành công!");
        triggerConfetti();
        localStorage.setItem("accountType", accountType);
        localStorage.setItem(
          "user",
          JSON.stringify(accountType === "admin" ? data.admin : data.user)
        );
        window.location.href = "/Main/in/Main menu/dashboard/dashboard.html";
      } else {
        alert(data.error || "Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      alert("Lỗi hệ thống! Vui lòng thử lại sau.");

      // Fallback demo offline
      if (
        accountType === "admin" &&
        (emailOrUsername === "huymt0401@gmail.com" ||
          emailOrUsername === "admin") &&
        password === "admin123"
      ) {
        alert("Đăng nhập thành công (offline - admin)!");
        triggerConfetti();
        localStorage.setItem("accountType", "admin");
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: "Admin",
            username: emailOrUsername,
            role: "admin",
          })
        );
        window.location.href = "/Main/in/Main menu/dashboard/dashboard.html";
      } else if (
        accountType === "user" &&
        emailOrUsername === "user@example.com" &&
        password === "user123"
      ) {
        alert("Đăng nhập thành công (offline - user)!");
        triggerConfetti();
        localStorage.setItem("accountType", "user");
        localStorage.setItem(
          "user",
          JSON.stringify({ name: "User", email: emailOrUsername, role: "user" })
        );
        window.location.href = "/Main/in/Main menu/dashboard/dashboard.html";
      }
    }
  });

  // ====== FORGOT PASSWORD ======
  const forgotPasswordLink = document.querySelector(".sign-in a");
  forgotPasswordLink.addEventListener("click", async function (event) {
    event.preventDefault();

    const accountType = document.getElementById("account-type").value;
    const emailOrUsername = prompt(
      "Nhập email (User) hoặc username (Admin) để đặt lại mật khẩu:"
    );
    if (!emailOrUsername) {
      alert("Vui lòng nhập email hoặc username!");
      return;
    }

    let forgotUrl = "";
    let body = {};

    if (accountType === "user") {
      forgotUrl = "http://localhost:3000/api/user/forgot-password";
      body = { email: emailOrUsername };
    } else if (accountType === "admin") {
      forgotUrl = "http://localhost:3000/api/admin/forgot-password";
      const username =
        emailOrUsername === "huymt0401@gmail.com" ? "admin" : emailOrUsername;
      body = { username };
    }

    try {
      const response = await fetch(forgotUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Đã gửi liên kết đặt lại mật khẩu!");
      } else {
        alert(data.error || "Không thể gửi liên kết!");
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      alert("Lỗi hệ thống! Vui lòng thử lại sau.");
    }
  });
});
(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'938eabafbaeebd48',t:'MTc0NjA5NjEzMC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();
