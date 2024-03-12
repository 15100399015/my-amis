#!/bin/bash
set -e

export NODE_ENV=production

rm -rf esm
rm -rf lib
rm -rf output

echo "===rollup build==="
NODE_ENV=production ../../node_modules/.bin/rollup -c

echo "===build-schemas==="
npm run build-schemas
