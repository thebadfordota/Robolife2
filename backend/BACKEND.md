# Backend Robolife2

### Платформа
- Python 3.10
- Django Rest Framework

### Настройка проекта

- backend должен быть помечен как Sources Root
- в корне backend не должно быть файла  `__init__.py`
- содержимое файла `.env.sample` необходимо скопировать в файл `.env.dev`, заполнив необходимые параметры

### Создание компонента

1. Создать директорию `без __init__.py` с названием компонента `%NAME%`
2. Исполнить команду:
```bash
> mkdir %NAME%
> python manage.py startapp %NAME% components/%NAME% --template shared/component_template
```
