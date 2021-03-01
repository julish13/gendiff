install: 
	npm install

publish:
	npm publish --dry-run

lint:
	npx prettier --write ./src/ ./__tests__/ ./bin/
	npx eslint --fix .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
