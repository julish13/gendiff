# Diff generator
[![Actions Status](https://github.com/julish13/gendiff/workflows/hexlet-check/badge.svg)](https://github.com/julish13/gendiff/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/e585564cb6ca1ead53c6/maintainability)](https://codeclimate.com/github/julish13/gendiff/maintainability)
[![Node CI](https://github.com/julish13/gendiff/actions/workflows/tests.yml/badge.svg)](https://github.com/julish13/gendiff/actions/workflows/tests.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e585564cb6ca1ead53c6/test_coverage)](https://codeclimate.com/github/julish13/gendiff/test_coverage)

Diff generator is a program that determines the difference between two data structures. A similar mechanism is used in tests' output or while tracking changes in configuration files.

Features:

- different input formats: yaml, json;
- different report generation formats: plain text, stylish and json;

### While working on the project I learned:

- working with file structure in Node.js;
- working with tree-like data structures;
- automatic testing (Jest);
- building application architecture in JavaScript.

## System requirements

- bash / zsh
- Make
- Git
- Node.js

## Installation

To install, run the following commands:

```bash
git clone git@github.com:julish13/gendiff.git
cd gendiff
make
npm link
```

To get help information, run the following commands:

```bash
gendiff -h
```

[![asciicast](https://asciinema.org/a/IpPu3PnZDqi2zaB1yqLDrmGc4.svg)](https://asciinema.org/a/IpPu3PnZDqi2zaB1yqLDrmGc4)
