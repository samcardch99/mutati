module.exports = {
    content: [
        './src/**/*.{astro,js,ts,jsx,tsx}',
        './public/index.html',
    ],
    theme: {
        extend: {
            screens: {
                'thin-screen': '380px',
                'md-vertical': '768px',
                'md-custom': '637px',
                'md-custom-lg': '1023px',
                'md-860px': '860px',
                '2xl-prev': '1440px',
                '2xl-custom': '2000px',
                '3xl-custom': '3200px',
            },
        },
    },
    plugins: [],
};
