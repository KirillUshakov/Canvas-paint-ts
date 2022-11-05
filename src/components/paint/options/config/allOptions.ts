import { OptionList } from '@/types/optionList';

export const allOptions: OptionList = [
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
  }
  // {
  //   id: 4,
  //   title: 'Border radius',
  //   type: 'number',
  //   optionName: 'borderRadius',
  //   options: {
  //     min: 1,
  //     max: 1000,
  //     postfix: 'px'
  //   },
  //   value: ''
  // }
]
