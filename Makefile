install: 
	npm install

publish:
	npm publish --dry-run

prettier:
	npx prettier --write ./src/ ./__tests__/ ./bin/

lint:
	npx eslint --fix .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
