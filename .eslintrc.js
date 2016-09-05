module.exports = {
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
        }
    },
    rules: {
        semi:0,
        "default-case":2,
        eqeqeq:2,
        "no-alert":2,
        "no-fallthrough":0,
        "no-floating-decimal":2,
        "no-implicit-globals":2,
        "no-labels":2,
        "no-octal-escape":2,
        "no-return-assign":2,
        "no-useless-concat":2,
        "no-useless-escape":2,
        "no-with":2,
        "wrap-iife":[2,"inside"],
        yoda:2
    }
}