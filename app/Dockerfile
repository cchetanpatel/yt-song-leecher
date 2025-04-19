FROM jauderho/yt-dlp:latest

WORKDIR /app

RUN apk update
RUN apk add npm

COPY ./* /app/
RUN npm install

ENTRYPOINT []
CMD ["node", "index.js"]
