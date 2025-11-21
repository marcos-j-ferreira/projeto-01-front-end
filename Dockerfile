# FROM nginx:stable-alpine

# WORKDIR /app

# RUN rm /etc/nginx/conf.d/default.conf

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY . /usr/share/nginx/html

# EXPOSE 80


# ## == compila a API 


# =====================
# ETAPA 1: Build da API
# =====================
#FROM golang:1.23-alpine AS builder

#WORKDIR /build

#COPY back-end/ ./back-end/
#RUN cd back-end && go build -o api .

# =====================
# ETAPA 2: NGINX + FRONT + API
# =====================
FROM nginx:stable-alpine

# Remove configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia a nova configuração
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o front-end para a pasta do nginx
COPY . /usr/share/nginx/html

# Copia o binário da API compilado
#COPY --from=builder /build/back-end/api /usr/local/bin/api

# Copia o script de inicialização
#COPY entrypoint.sh /entrypoint.sh
#RUN chmod +x /entrypoint.sh

EXPOSE 80

# Roda os dois serviços (Nginx + API)
#CMD ["/entrypoint.sh"]


