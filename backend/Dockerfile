FROM node:22.3 as base
RUN addgroup nodeusr && adduser --system --group nodeusr
WORKDIR /home/backend

FROM base as install

RUN mkdir -p /temp/dev/

COPY package.json package-lock.json /temp/dev/

RUN cd /temp/dev/ && npm install --frozen-lockfile

FROM install as run

RUN cd /home/backend

COPY --from=install /temp/dev/package.json /temp/dev/package-lock.json ./
COPY --from=install /temp/dev/node_modules node_modules
## rest of the stuff..
COPY . .

RUN npm run generate:types

USER nodeusr  

ENTRYPOINT ["npm", "run", "dev"]
