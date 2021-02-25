### Вычислитель отличий
[![Actions Status](https://github.com/julish13/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/julish13/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/ebabe43d15e22c85dead/maintainability)](https://codeclimate.com/github/julish13/frontend-project-lvl2/maintainability)
[![tests](https://github.com/julish13/frontend-project-lvl2/actions/workflows/tests.yml/badge.svg)](https://github.com/julish13/frontend-project-lvl2/actions/workflows/ESlint.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ebabe43d15e22c85dead/test_coverage)](https://codeclimate.com/github/julish13/frontend-project-lvl2/test_coverage)

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

Возможности утилиты:

- поддержка разных входных форматов: yaml, json;
- генерация отчета в виде plain text, stylish и json;

## Системные требования

 - Bash / Zsh
 - Make
 - Git
 - Node.js

## Установка

Для установки выполните следующие команды:

```bash
git clone git@github.com:julish13/frontend-project-lvl2.git
cd frontend-project-lvl2
make
npm link
```

Для просмотра справочной информации по программе выполните следующие команды:

```bash
gendiff -h
```

[![asciicast](https://asciinema.org/a/sxZ3uNekyMpCFUIfjypisGnsz.svg)](https://asciinema.org/a/sxZ3uNekyMpCFUIfjypisGnsz)