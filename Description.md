### Запуск проекта:

_В папке `fit-friends` запустите команду:_
```
npm i
```
_В папке с проектом `users` запустите команду:_
```
docker-compose up -d
```
_В папке с проектом `gym` запустите команды:_
```
docker-compose up -d
```
```
nx db-migrate
```
```
nx db-generate
```
```
nx db-fill
```
_В папке `fit-friends` запустите команды:_
```
nx run users:serve
```
```
nx run gym:serve
```
