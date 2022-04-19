# Вычислитель отличий
[![Actions Status](https://github.com/julish13/gendiff/workflows/hexlet-check/badge.svg)](https://github.com/julish13/gendiff/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/e585564cb6ca1ead53c6/maintainability)](https://codeclimate.com/github/julish13/gendiff/maintainability)
[![Node CI](https://github.com/julish13/gendiff/actions/workflows/tests.yml/badge.svg)](https://github.com/julish13/gendiff/actions/workflows/tests.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e585564cb6ca1ead53c6/test_coverage)](https://codeclimate.com/github/julish13/gendiff/test_coverage)

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

Возможности утилиты:

- поддержка разных входных форматов: yaml, json;
- генерация отчета в различных форматах: plain text, stylish и json;

### В рамках проекта усвоила:

- работа с файловой структурой в Node.js;
- работа с древовидными структурами данных;
- автоматическое тестирование (Jest);
- создание архитектуры приложения на JavaScript.

## Системные требования

 - Bash / Zsh
 - Make
 - Git
 - Node.js

## Установка

Для установки выполните следующие команды:

```bash
git clone git@github.com:julish13/gendiff.git
cd gendiff
make
npm link
```

Для просмотра справочной информации по программе выполните следующие команды:

```bash
gendiff -h
```

[![asciicast](https://asciinema.org/a/IpPu3PnZDqi2zaB1yqLDrmGc4.svg)](https://asciinema.org/a/IpPu3PnZDqi2zaB1yqLDrmGc4)
