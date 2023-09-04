module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	settings: {
		react: {
			version: "detect"
		},
		"import/resolver": {
			node: {
			  paths: ["src"],
			  extensions: [".js", ".jsx"]
			}
		  }
	},
	extends: [
		"@claro/eslint-config/base-rules",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"standard"
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: "module",
        "project": "./jsconfig.json"
	},
	plugins: [
		"react"
	],
    "ignorePatterns": ["**/src/*"],
	rules: {
		"react/prop-types": "off",
		"multiline-ternary": "off",
		"no-unused-vars": "off",
		"prefer-const": "off",
		"prefer-regex-literals": "off",
		"no-undef": "off",
		"react/no-children-prop": "off",
		"no-mixed-operators": ["warn", { allowSamePrecedence: true }],
		"no-tabs": ["warn", { allowIndentationTabs: true }],
		"no-mixed-spaces-and-tabs": "off",
		"no-unused-expressions": "off",
		"import/extensions": "off",
		"import/no-named-as-default": "off",
		"consistent-return": "off",
		"import/prefer-default-export": "off",
		"no-shadow": "off",
		"max-len": "off",
		"no-param-reassign": ["warn", { props: false }],
		"no-console": "off",
		"import/export": "off",
		"no-nested-ternary": "off",
		"import/no-unresolved": "off",
		"no-return-assign": "off",
		"no-return-await": "off",
		"no-plusplus": "off",
		"linebreak-style": "off",
		indent: ["warn", "tab"],
		quotes: ["warn", "double"],
		semi: ["warn", "always"],
		"no-extra-semi": ["warn"],
		"key-spacing": ["warn", {
			beforeColon: false,
			afterColon: true,
			mode: "strict"
		}]
	}
};