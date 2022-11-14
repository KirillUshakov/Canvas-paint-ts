import { availableOptionSettings, availablePaintOptions, contextOptionType, customContextOptionType } from "./optionTypes"

export type toolAvailableOption = {
  optionName: contextOptionType | customContextOptionType,
  title?: string,
  options?: availableOptionSettings,
  value?: any,
}

export type setupToolOption = {
  name: availablePaintOptions,
  value: number | string,
  custom: boolean,
}
