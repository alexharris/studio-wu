// Shared "Bottom Margin" fields appended to every content block type
// (used by both project.js and about.js content block definitions)
export const bottomMarginFields = [
  {
    name: 'bottomMargin',
    title: 'Bottom Margin',
    type: 'string',
    options: {
      list: [
        {title: 'Default', value: 'default'},
        {title: 'None', value: 'none'},
        {title: 'Small (12px)', value: 'small'},
        {title: 'Medium (24px)', value: 'medium'},
        {title: 'Large (48px)', value: 'large'},
        {title: 'Custom', value: 'custom'},
      ],
    },
    initialValue: 'default',
  },
  {
    name: 'customBottomMargin',
    title: 'Custom Bottom Margin (px)',
    type: 'number',
    description: 'Used when Bottom Margin is set to Custom',
    hidden: ({parent}) => parent?.bottomMargin !== 'custom',
    validation: Rule => Rule.min(0),
  },
]
