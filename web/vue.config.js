

module.exports = {

    publicPath: './',
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
            title: "send sms send email",
            cdn: {
                css: [
                    "https://cdn.jsdelivr.net/npm/element-plus@1.0.2-beta.28/lib/theme-chalk/index.css"
                ],
                js: [
                    "https://unpkg.com/vue@3.0.5",
                    "https://unpkg.com/element-plus@1.0.2-beta.28/lib/index.full.js"
                ]
            },
        }
    },




    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'element-plus': "ElementPlus"
        }
    },

}
