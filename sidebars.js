module.exports = {
  someSidebar: [
    {
      type: 'doc',
      id: 'home-doc',
      label: 'Documentation',
    },
    {
      type: 'category',
      label: 'Lendiom Pay',
      collapsed: false,
      items: [
        'pay/what-is-pay',
        {
            type: 'category',
            label: 'Guides',
            items: [
              {
                type: 'autogenerated',
                dirName: 'pay/guides',
              },
            ],
          },
      ],
    },
    {
      type: 'category',
      label: 'Lendiom App',
      collapsed: false,
      items:
      [
        'app/what-is-lendiom',
        'app/communication',
        'app/faq',
        {
          type: 'category',
          label: 'Guides',
          items: [
            {
              type: 'autogenerated',
              dirName: 'app/guides',
            },
          ],
        },
        {
          type: 'category',
          label: 'How it Works',
          items: [
            {
              type: 'autogenerated',
              dirName: 'app/how-it-works'
            }
          ]
        },
        {
          type: 'category',
          label: 'Template Variables',
          items: [
            {
              type: 'autogenerated',
              dirName: 'app/variables',
            },
          ],
        },
      ],
    }
  ],
};
