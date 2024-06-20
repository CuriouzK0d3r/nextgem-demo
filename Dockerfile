FROM sitespeedio/node:ubuntu-22-04-nodejs-20.11.1

RUN apt-get update && apt-get install -y --no-install-recommends git python3 vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# RUN npm i -g yarn

RUN pnpm install

COPY . .

# COPY ./apps/artemis-web/scripts/* ./

RUN yarn run nx build niki-platform --prod

ENTRYPOINT ["NODE_ENV=production NEXT_PUBLIC_REVISION=$(git rev-parse HEAD) yarn run nx serve artemis-web --prod "]
