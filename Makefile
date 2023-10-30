API_SRC_DIR=./api/
API_SRC_SERVICE=./sosmed-api.service/
DEST_API_SERVICE=/etc/system/systemd/sosmed-api.service/

CLIENT_SRC_DIR=./client-current/
CLIENT_DEST_DIR=/var/www/sosmed


client_build:
	cd ${CLIENT_SRC_DIR} && npm i && npm run build && make move_client_build && ../

move_client_build:
	cp -r ${CLIENT_SRC_DIR} ${CLIENT_DEST_DIR}

api_build:
	cd ${API_SRC_DIR} && npm i && npm run build && cd ../

move_api_service:
	cp -r sosmed-api.service /etc/system/systemd/sosmed-api.service && make enable_api_service && make start_api_service

enable_api_service:
	sudo systemctl enable sosmed-api.service
start_api_service:
	sudo systemctl start sosmed-api.service

