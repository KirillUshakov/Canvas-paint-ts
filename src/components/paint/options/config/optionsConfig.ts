import { OptionListItem } from '@/types/optionTypes';

export const allOptionList: OptionListItem[] = [
  {
    id: 1,
    title: 'Line Width',
    type: 'number',
    optionName: 'lineWidth',
    options: {
      min: 1,
      max: 60,
      postfix: 'px'
    },
    value: ''
  },
  {
    id: 2,
    title: 'Fill color',
    type: 'color',
    optionName: 'fillStyle',
    options: {},
    value: ''
  },
  {
    id: 3,
    title: 'Border color',
    type: 'color',
    optionName: 'strokeStyle',
    options: {},
    value: ''
  },
  {
    id: 4,
    title: 'Border radius',
    type: 'number',
    optionName: 'borderRadius',
    options: {
      min: 0,
      max: 1000,
      postfix: 'px'
    },
    value: ''
  },
  {
    id: 5,
    title: 'Fill style',
    type: 'radio',
    optionName: 'fillMode',
    options: {
      optionsList: [
        {
          name: 'No fill',
          value: 'nofill'
        },
        {
          name: 'Solid',
          value: 'solid'
        }
      ]
    },
    value: 'solid'
  },
  {
    id: 6,
    title: 'Border style',
    type: 'radio',
    optionName: 'strokeFill',
    options: {
      optionsList: [
        {
          name: 'No fill',
          value: 'nofill'
        },
        {
          name: 'Solid',
          value: 'solid'
        }
      ]
    },
    value: 'solid'
  }
]
