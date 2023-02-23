module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'standard-with-typescript',
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'vue',
    ],
    rules: {
        "comma-dangle": [2, "always-multiline"],
        "@typescript-eslint/comma-dangle": [2, "always-multiline"],
    }
}
