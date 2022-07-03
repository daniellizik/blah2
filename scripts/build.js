/**
 * why not use built-in swagger-cli bundle?
 * https://github.com/OAI/OpenAPI-Specification/issues/417
 * TLDR: overall better DX to have a custom bundler
 */
const fs = require('fs');
const path = require('path');

const requireYml = require('require-yml');

const yml = (dir) => requireYml(path.resolve(__dirname, dir));

const group = (dir) =>
  Object.values(yml(dir)).reduce(
    (acc, obj) => ({
      ...acc,
      ...obj
    }),
    {}
  );

const spec = {
  ...yml('../src/meta.yml'),
  paths: group('../src/paths'),
  components: {
    parameters: group('../src/components/parameters'),
    schemas: group('../src/components/schemas')
  }
};

fs.writeFileSync(
  path.resolve(__dirname, '../docs/spec.json'),
  JSON.stringify(spec, null, 2)
);

console.log('spec built');
