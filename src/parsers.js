import yaml from 'js-yaml';

const formatsMap = {
  '.yml': yaml.load,
  '.json': JSON.parse,
};

const parse = (data, format) => formatsMap[format](data);

export default parse;
