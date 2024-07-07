module.exports = {
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.test\\.ts$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};