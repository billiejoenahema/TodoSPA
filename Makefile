init:
    docker-compose up -d
    docker-compose exec app composer install
    docker-compose exec app cp src/.env.example src/.env
    docker-compose exec app php artisan key:generate
    docker-compose exec app php artisan storage:link
    docker-compose exec app php artisan migrate
    docker-compose exec app php artisan db:seed
    chmod 775 -R src/storage/
up:
    docker-compose up -d
down:
    docker-compose down
start:
    docker-compose start
stop:
    docker-compose stop
app:
    docker-compose exec --user=www-data app bash
db:
    docker-compose exec db bash
