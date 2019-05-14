FROM node:11.12

ENV NODE_ENV development

RUN mkdir /src
WORKDIR /src

COPY . /src

RUN npm install

CMD ["npm", "run", "dev"];
