FROM node:18.9.0-alpine3.16
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . .
EXPOSE 3001
ENV PORT=3001
ENV DB_URI="postgresql://postgres:forum123@database:5432/forum-db"
CMD ["npm", "start"]