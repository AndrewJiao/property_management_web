FROM node:23.5.0 as builder
LABEL authors="Andrew"
WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY src src/
COPY public public/
COPY tsconfig.json ./
COPY .env.production ./

RUN npm run build

FROM nginx:1.27.3

COPY --from=builder /app/build /usr/share/nginx/html
# 拷贝nginx配置文件
COPY nginx/cert/test/ /etc/nginx/cert/
COPY nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
