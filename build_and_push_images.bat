docker build --rm --no-cache -t forum-app-node-server ./Server/
docker image tag forum-app-node-server alerajo/forum-app-node-server:latest
docker image push alerajo/forum-app-node-server:latest

docker build --rm --no-cache -t forum-app-postgres-db ./Database/
docker image tag forum-app-postgres-db alerajo/forum-app-postgres-db:latest
docker image push alerajo/forum-app-postgres-db:latest