const math = require('remark-math');
const katex = require('rehype-katex');

module.exports = {
    title: 'Lendiom',
    tagline: 'Lending a helping hand to independent lenders.',
    url: 'https://docs.lendiom.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'Lendiom',
    projectName: 'docs',
    themeConfig: {
        colorMode: {
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: 'Lendiom',
            logo: {
                alt: 'Lendiom\'s Logo',
                src: 'img/logo.png',
            },
            items: [
                {
                    to: '/',
                    activeBasePath: 'docs',
                    label: 'Docs',
                    position: 'left',
                },
                {
                    to: 'blog',
                    label: 'Blog',
                    position: 'left',
                },
                {
                    href: 'https://app.lendiom.com',
                    label: 'Go to the App',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [],
            copyright: `Copyright © 2019 - ${new Date().getFullYear()} Lendiom.`,
        },
        umamiAnalytics: {
            websiteID: 'b45ce3de-5a4d-4922-aee2-80dd1a354d39',
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    routeBasePath: '/',
                    // Please change this to your repo.
                    editUrl: 'https://github.com/Lendiom/docs/edit/master/',
                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl: 'https://github.com/Lendiom/docs/edit/master/blog/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
    plugins: [
        './plugins/umami',
    ],
    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:
                'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],
};
