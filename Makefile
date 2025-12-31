.PHONY: start-server
start-server:
	cd passkey-server && npm run dev

.PHONY: start-client
start-client:
	cd passkey-client && npm run dev