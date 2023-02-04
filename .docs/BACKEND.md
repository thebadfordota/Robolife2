# Руководство для локальной разработки Backend-a Robolife2

### Платформа

- Python 3.10
- Django 4.1.3
- Django Rest Framework 3.14.0

### Настройка backend-a

- backend должен быть помечен как Sources Root
- в корне backend не должно быть файла  `__init__.py`
- содержимое файла `.env.sample` необходимо скопировать в файл `.env.dev`, заполнив необходимые параметры

### Запуск

- pip install -r requirements.txt
- python3 manage.py runserver
- python3 manage.py migrate
- python3 manage.py createsuperuser

### Заполнить базу данных начальными значениями
- python manage.py loaddata metrics.json
- python manage.py loaddata region_norm.json
- python manage.py update_metrics

### Создание компонента

1. Создать директорию `без __init__.py` с названием компонента `%NAME%`
2. Исполнить команду:
```bash
> mkdir %NAME%
> python manage.py startapp %NAME% components/%NAME% --template shared/component_template
```
3. Отредактировать файлы `apps.py` и `urls.py`
4. Импортировать все модели в `__init__.py` файл пакета models

### Команды docker-a (прописывать в корне приложения)
* Собрать и запустить контейнеры
```bash
docker-compose -f .deploy/robolife2_develop/docker-compose.yml  up -d --build
```
* Остановить и удалить контейнеры
```bash
docker-compose -f .deploy/robolife2_develop/docker-compose.yml  down -v
```
* Удалить все неиспользуемые тома и контейнеры
```bash
docker system prune
```
