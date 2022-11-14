export type contextOptionType = 'lineWidth' | 'fillStyle' | 'strokeStyle';
export type customContextOptionType = 'borderRadius' | 'strokeFill' | 'fillMode';
export type contextOptionsArrType = ['lineWidth', 'fillStyle', 'strokeStyle'];
export type customContextOptionsArrType = ['borderRadius', 'fillMode', 'strokeFill'];
export const contextOptionsArr: contextOptionType[] = ['lineWidth', 'fillStyle', 'strokeStyle'];
export const customContextOptionsArr : customContextOptionType[] = ['borderRadius', 'fillMode', 'strokeFill'];

export type availablePaintOptions = keyof contextOptionType | keyof customContextOptionType;

export type availableOptionSettings = {
  min?: number,
  max?: number,
  prefix?: string,
  postfix?: string,
  optionsList?: {
    name: string,
    value: string
  }[]
}

export type OptionListItem = {
  id: number,
  title: string,
  type: string,
  optionName: contextOptionType | customContextOptionType,
  value: any,
  options: availableOptionSettings,
}

export type CustomOptionListItem = {
  id: number,
  title: string,
  type: string,
  optionName: customContextOptionType,
  value: any,
  options: availableOptionSettings,
}
