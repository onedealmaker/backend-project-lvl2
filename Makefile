install:
	npm install
lint:
	npx eslint .
test-coverage:
	npx jest --coverage
test:
	npm test