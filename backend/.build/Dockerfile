FROM python:3.10.11-slim

ENV WORKDIR=/code \
    BASEDIR=backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBIAN_FRONTEND="noninteractive" TZ="Europe/Samara"

# set work directory
WORKDIR $WORKDIR

COPY $BASEDIR/config/requirements.txt $WORKDIR

RUN apt update && \
    apt install -y postgresql gcc g++ python3-dev zlib1g-dev libjpeg-dev musl-dev make gfortran libopenblas-dev pkgconf

# install dependencies
RUN pip install --upgrade pip

COPY $BASEDIR/config/requirements.txt /code/

RUN pip install -r requirements.txt
RUN rm -rf .cache/pip

# copy project
COPY $BASEDIR/. $WORKDIR
EXPOSE 8000