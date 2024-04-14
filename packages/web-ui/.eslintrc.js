module.exports = {
  extends: ["custom/react-internal"],
  rules: {
    "eslint-comments/require-description": "off",
    "unicorn/filename-case": [
      "error",
      {
        case: "pascalCase",
      },
    ],
  },
};
