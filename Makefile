startdev:
	docker-compose -f docker-compose.dev.yml up --build

stopdev:
	docker-compose -f docker-compose.dev.yml down

clean:	cleanapp cleanbackend

cleanapp:
	rm -rf ./app/build/

cleanbackend:
	rm -rf ./server/build/
