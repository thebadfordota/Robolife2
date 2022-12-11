FROM python:3.10.8-alpine3.17

ENV WORKDIR=/code \
    BASEDIR=backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set work directory
WORKDIR $WORKDIR

COPY $BASEDIR/config/requirements.txt $WORKDIR

RUN apk update \
    && apk add postgresql-dev gcc python3-dev zlib-dev jpeg-dev  musl-dev gcc make

# install dependencies
RUN pip install --upgrade pip

COPY $BASEDIR/config/requirements.txt /code/

RUN pip install -r requirements.txt
RUN rm -rf .cache/pip

# copy project
COPY $BASEDIR/. $WORKDIR
EXPOSE 8000