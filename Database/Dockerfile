FROM postgres
WORKDIR /db
ENV POSTGRES_PASSWORD forum123
ENV POSTGRES_DB forum-db
COPY setup.sql /docker-entrypoint-initdb.d/
EXPOSE 5432