export const getProperty = <T>(o: T, propertyName: string): any => {
    return o[propertyName as keyof T];
  };

export const objectToQueryString = (filter: { [p: string]: any }) => {
    return Object.keys(filter).reduce((query, current) => {
      return query + `${current}=${getProperty(filter, current)}&`;
    }, "");
  };