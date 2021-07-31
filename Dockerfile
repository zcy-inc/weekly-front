FROM node:14-alpine AS builder 
COPY . /code
WORKDIR /code
RUN npm install && npm run build

FROM nginx:1.21.0-alpine
COPY --from=builder /code/dist/  /root/weekly/weekly-client/

COPY ./nginx.conf /etc/nginx

EXPOSE 80

CMD sed -i "s/localhost/$SERVER_IP/g" `grep http://localhost:3030 -rl /root/weekly/weekly-client/`; nginx -g "daemon off;"
# CMD nginx -g "daemon off;"
