#!/usr/bin/env bash
# temporary script to deploy to google app engine.

npm install && npm run build

mkdir tmp
cp -r build tmp/
cp app.yaml tmp/
cp package.json tmp/
cp ./.babelrc tmp/

cd tmp/
gsutil cp gs://housekeeper-223422.appspot.com/secrets/dev/.env .
gcloud app deploy --quiet
cd ..

rm -rf tmp/