const isPlainObject = (value: any): value is Record<string, any> => {
  return !!value && typeof value === 'object' && value.constructor === Object;
};

const toCamel = (key: string): string => {
  return key.replace(/_([a-z0-9])/g, (_, chr) => chr.toUpperCase());
};

const toSnake = (key: string): string => {
  return key
    .replace(/([0-9])([A-Za-z])/g, '$1_$2')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
    .toLowerCase();
};

const deepConvertKeys = <T>(input: any, keyTransformer: (k: string) => string): T => {
  if (Array.isArray(input)) {
    return input.map((v) => deepConvertKeys(v, keyTransformer)) as unknown as T;
  }

  if (isPlainObject(input)) {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(input)) {
      const newKey = keyTransformer(k);
      out[newKey] = deepConvertKeys(v, keyTransformer);
    }
    return out as T;
  }

  return input as T;
};

export const camelizeKeys = <T = any>(obj: any): T => {
  return deepConvertKeys<T>(obj, toCamel);
};

export const decamelizeKeys = <T = any>(obj: any): T => {
  return deepConvertKeys<T>(obj, toSnake);
};
