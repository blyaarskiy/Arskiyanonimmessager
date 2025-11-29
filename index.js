// Ждём полной загрузки HTML
document.addEventListener("DOMContentLoaded", function () {
  // Хранение пользователя и сообщений
  let currentUser = null;
  let chatMessages = [];

  // Получаем все элементы из HTML
  const regBtn = document.getElementById("regBtn");
  const sendBtn = document.getElementById("sendBtn");
  const usernameInput = document.getElementById("username");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");
  const chatDiv = document.getElementById("chat");
  const registerDiv = document.getElementById("register");
  const chatroomDiv = document.getElementById("chatroom");
  const greetingH2 = document.getElementById("greeting");

  // Проверка наличия всех элементов
  if (
    !regBtn ||
    !sendBtn ||
    !usernameInput ||
    !phoneInput ||
    !messageInput ||
    !chatDiv ||
    !registerDiv ||
    !chatroomDiv ||
    !greetingH2
  ) {
    console.log(
      "Ошибка: один из элементов HTML не найден. Проверьте id в HTML!"
    );
    return;
  }

  // Функция для регистрации пользователя
  function registerUser() {
    const username = usernameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (username === "" || phone === "") {
      alert("Введите ник и номер/токен!");
      return;
    }

    currentUser = { username: username, phone: phone };
    registerDiv.style.display = "none";
    chatroomDiv.style.display = "block";
    greetingH2.textContent = "Привет, " + username + "!";

    renderChat();
  }

  // Обработчик кнопки регистрации
  regBtn.onclick = registerUser;

  // Функция отправки сообщения
  function sendMessage() {
    if (!currentUser) return;

    const text = messageInput.value.trim();
    if (text === "") return;

    const newMessage = { user: currentUser.username, text: text };
    chatMessages.push(newMessage);

    messageInput.value = "";
    renderChat();
  }

  // Обработчик кнопки отправки
  sendBtn.onclick = sendMessage;

  // Функция рендеринга чата
  function renderChat() {
    chatDiv.innerHTML = "";

    for (let i = 0; i < chatMessages.length; i++) {
      const msg = chatMessages[i];
      const div = document.createElement("div");

      // Добавляем класс для своего/чужого сообщения
      div.className =
        "message " + (msg.user === currentUser.username ? "own" : "other");
      div.textContent = msg.user + ": " + msg.text;

      chatDiv.appendChild(div);
    }

    // Скролл вниз при добавлении нового сообщения
    chatDiv.scrollTop = chatDiv.scrollHeight;
  }

  // Дополнительно: обработка Enter для отправки
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
      e.preventDefault();
    }
  });

  // Функция для очистки всех сообщений (для теста)
  function clearChat() {
    chatMessages = [];
    renderChat();
  }

  // Для теста: можно вызвать clearChat() в консоли
  window.clearChat = clearChat;

  console.log("Chat JS успешно загружен и готов к работе!");
});
