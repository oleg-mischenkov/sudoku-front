# Используем базовый образ для Node.js, так как AngularJS требует среды для веб-сервера
FROM node:14

# Устанавливаем простейший HTTP сервер для статических файлов
RUN npm install -g http-server

# Создаем директорию для приложения внутри контейнера
WORKDIR /usr/src/app

# Копируем все файлы из текущей директории в рабочую директорию контейнера
COPY . .

# Устанавливаем HTTP сервер как службу для запуска приложения
CMD ["http-server", "-p", "63342"]

# Указываем порт, который должен быть доступен
EXPOSE 63342

