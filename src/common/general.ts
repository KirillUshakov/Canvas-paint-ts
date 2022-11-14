import { contextOptionsArr, contextOptionType, customContextOptionsArr, customContextOptionType } from '@/types/optionTypes';

export function copy <T> (el: T): T {
  return JSON.parse(JSON.stringify(el));
}

export function isCustomOption (optionName: any): optionName is keyof customContextOptionType {
  return customContextOptionsArr.includes(optionName);
}

export function isContextOption (optionName: any): optionName is keyof contextOptionType {
  return contextOptionsArr.includes(optionName);
}
