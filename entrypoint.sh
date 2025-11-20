#!/bin/sh

# Inicia a API Go em background
/usr/local/bin/api &

# Inicia o Nginx em primeiro plano
nginx -g "daemon off;"

