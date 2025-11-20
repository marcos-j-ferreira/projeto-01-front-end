#!/bin/sh

COUNTER_FILE="/usr/share/nginx/html/counter.json"

COUNT=$(cat $COUNTER_FILE | grep -o '[0-9]*')
NEW_COUNT=$((COUNT + 1))

echo "{ \"count\": $NEW_COUNT }" > $COUNTER_FILE
