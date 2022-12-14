# Руководство для локальной разработки Frontend-a Robolife2

### Платформа

- React 18.2.0
- Redux 4.2.0
- Mui 5.8.6
- Amcharts 5.2.31
- RSuite 5.22.2
- Axios 1.1.3

### Локальный запуск
#### Настройка
- Необходимо установить NodeJS v16.13.2. NodeJS можно скачать с [официального сайта](https://nodejs.org/ru/download/).
- В директории frontend необходимо применить команду ```npm ci```.
- Необходимо настроить файл Constants.js в директории frontend/src/constants/. `base_url` в `ROBOLIFE2_BACKEND_API` должен ссылаться на основу пути backend'а (по умолчанию http://localhost:8000).
- Проверьте настройки backend в файле BACKEND.md.

#### Запуск
После настройки запускается следующей командой:
```bash
npm run start
```
Это запускает проект React в режиме разработки по пути http://localhost:3000/ по умолчанию.

### Запуск через docker
#### Настройка
- Необходимо настроить файл Constants.js в директории frontend/src/constants/. `base_url` в `ROBOLIFE2_BACKEND_API` должен ссылаться на основу пути backend'а (по умолчанию http://localhost/api).
- Проверьте настройки backend в файле BACKEND.md.

#### Запуск
```bash
docker-compose -f .deploy/robolife2_develop/docker-compose.yml up -d --build
```

При запуске docker'а автоматически запускается backend и nginx со собранным проектом React. Доступ к сайту: http://localhost/.

#### Остановить и удалить контейнеры
```bash
docker-compose -f .deploy/robolife2_develop/docker-compose.yml down -v
```
