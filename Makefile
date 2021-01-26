install:
	npm install
	npm run build
start:
	npx babel-node src/bin/gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
build:
	rm -rf dist
	npm run build
test-coverage:
	npx jest --coverage
test:
	npx jest