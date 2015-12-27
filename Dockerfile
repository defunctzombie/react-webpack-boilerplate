FROM mhart/alpine-node:4.2.4

RUN mkdir /app
WORKDIR /app

ADD . /app

RUN apk add --update git && \
    npm install --no-optional && \
    npm run build && \
    npm prune --production && \
    apk del git && \
    rm -rf /tmp/* /root/.npm /root/.node-gyp

ENV NODE_ENV production
