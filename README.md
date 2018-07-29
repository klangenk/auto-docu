# auto-docu [![Coverage Status](https://img.shields.io/coveralls/github/klangenk/auto-docu/master.svg)](https://coveralls.io/github/klangenk/auto-docu?branch=master)

This is a module to auto generate JSDoc comments in NodeJS projects. 

### Workflow

- run ```npm i auto-docu```
- run ```npx enable-inspection <folder>```
  to modify the source files inside the given folder to log the function calls
- start the application you want to document the code of 
- when all functions have been called run ```npx generate-doc <folder>``` to generate the comments for the documentation and insert it into the source code
- run ```npx cleanup-inspection <root folder>``` to remove all meta files that have been created on the inspection

If you want to reset all the changes done by the inspection run ```npx cleanup-inspection <folder> --restore```
