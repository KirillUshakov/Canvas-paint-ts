import { availableOptionSettings } from '@/types/availableOptionSettings'
import availableContextOptions from './availableContextOptions'

export type OptionList = {
  id: number,
  title: string,
  type: string,
  optionName: availableContextOptions,
  value: any,
  options: availableOptionSettings,
}[]
