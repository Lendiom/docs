module.exports = function myPlugin(context) {
    const { siteConfig } = context;
    const { themeConfig } = siteConfig;
    const { umamiAnalytics } = themeConfig || {};

    if (!umamiAnalytics) {
        throw new Error('You need to specify "umamiAnalytics" object in "themeConfig" with "websiteID" field in it to use lendiom-plugin-umami.');
    }

    const { websiteID } = umamiAnalytics;

    if (!websiteID) {
        throw new Error('You specified the "umamiAnalytics" object in "themeConfig" but the "websiteID" field was missing. Please ensure this is not a mistake.');
    }

    const isProd = process.env.NODE_ENV === 'production';

    return {
        name: 'lendiom-plugin-umami',

        injectHtmlTags() {
            if (!isProd) {
                return {};
            }

            return {
                headTags: [
                    {
                        tagName: 'script',
                        attributes: {
                            async: true,
                            defer: true,
                            'data-website-id': websiteID,
                            src: 'https://uem.fidetech.io/umami.js',
                        },
                    },
                ],
            };
        },
    };
};