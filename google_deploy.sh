#!/usr/bin/env bash
# temporary script to deploy to google app engine.

rm -rf node_modules

gsutil cp gs://housekeeper-223422.appspot.com/secrets/dev/.env .
npm install && npm run build

gcloud app deploy --quiet