docker build --rm --no-cache -t forum-app-postgres-db ./
docker run -d --name forum-app-postgres-db -p 5432:5432 -v forum-psql-data:/var/lib/postgresql/data forum-app-postgres-db