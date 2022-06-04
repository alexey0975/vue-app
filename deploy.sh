#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# переход в каталог сборки
cd dist

# инициализация репозитория и загрузка кода в GitHub
git init
git add .
git commit -m 'deploy'

git push -f https://github.com/alexey0975/vue-app.git master:gh-pages

cd -