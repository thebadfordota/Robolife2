### --- Build pip packages --- ###
FROM python:3.9.13-alpine3.16 as build

ENV WORKDIR=/code \
    WHEELDIR=/opt/pip_packages \
    BASEDIR=backend

ENV PYTHONUNBUFFERED 1

WORKDIR $WORKDIR

COPY $BASEDIR/config/requirements.txt $WORKDIR

RUN apk --no-cache add --virtual build-dependencies \
    gcc \
    musl-dev \
    linux-headers \
    make \
    libffi-dev \
    libxml2-dev \
    libxslt-dev \
    postgresql-dev \
    libressl-dev \
    openssl-dev \
    cargo \
    librdkafka-dev \
    && pip wheel --wheel-dir=${WHEELDIR} -r requirements.txt \
    && rm -rf .cache/pip

### --- Final small image --- ###

FROM python:3.9.13-alpine3.16

ARG VERSION

ENV VERSION=${VERSION:-local-build} \
    WORKDIR=/code \
    WHEELDIR=/opt/pip_packages \
    BASEDIR=backend

WORKDIR $WORKDIR

COPY --from=build ${WHEELDIR} ${WHEELDIR}
COPY $BASEDIR/. $WORKDIR

RUN apk --no-cache add \
    libpq \
    gcc \
    libxslt \
    musl-dev \
    linux-headers \
    libc-dev \
    libressl-dev \
    openssl-dev \
    zlib-dev \
    librdkafka-dev \
    && pip install -r config/requirements.txt --find-links=${WHEELDIR} \
    && rm -rf .cache/pip

EXPOSE 8000
