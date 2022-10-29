FROM node:14.17.3
WORKDIR /app

#COPY package.json package-lock.json ./
#RUN npm install

#ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN npm run build