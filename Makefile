install:
	npm install
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