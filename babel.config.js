export default {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@Services': [
                        'src/infra/services'
                    ],
                    '@DTO': [
                        'src/domain/dto'
                    ],
                    '@Routes': [
                        'src/infra/http/routes'
                    ],
                    '@Domain': [
                        'src/domain'
                    ],
                    '@Entities': [
                        'src/infra/data/entities'
                    ],
                    '@Controllers': [
                        'src/controllers'
                    ],
                    '@Application': [
                        'src/application'
                    ],
                    '@UseCases': [
                        'src/application/useCases'
                    ],
                    '@Infra': [
                        'src/infra'
                    ],
                    '@Repositories': [
                        'src/infra/data/repositories'
                    ],
                    '@Shared': [
                        'src/shared'
                    ],
                    '@Middlewares': [
                        'src/infra/http/middlewares'
                    ],
                    '@Tests': [
                        '__tests__'
                    ],
                    '@CrossCutting': [
                        'src/crossCutting'
                    ]
                }
            }
        ],
        'babel-plugin-transform-typescript-metadata',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
    ]
};