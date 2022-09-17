.PHONY: build build-prod format clean

build:
	npm install && npm run build

build-prod:
	$(MAKE) build
	npm run lint
	cp package*.json build && cd build && npm install --omit=dev
	cd build && rm -Rf tsconfig.tsbuildinfo

clean:
	npm run clean

format:
	npm run format
