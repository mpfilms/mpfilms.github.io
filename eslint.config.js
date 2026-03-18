import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: 'module'
            },
            globals: {
                console: 'readonly',
                process: 'readonly',
                document: 'readonly',
                window: 'readonly',
                localStorage: 'readonly',
                HTMLElement: 'readonly',
                HTMLInputElement: 'readonly',
                HTMLIFrameElement: 'readonly',
                Element: 'readonly',
                IntersectionObserver: 'readonly',
                describe: 'readonly',
                beforeEach: 'readonly',
                it: 'readonly',
                expect: 'readonly'
            }
        },
        plugins: {
            '@typescript-eslint': tseslint,
            '@angular-eslint': angular,
            '@angular-eslint/template': angularTemplate
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...angular.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
            '@angular-eslint/prefer-inject': 'off'
        }
    },
    {
        ignores: [
            'node_modules/',
            'dist/',
            'coverage/',
            '/.angular/',
            '.idea/',
            '.vscode/',
            '.DS_Store'
        ]
    }
];