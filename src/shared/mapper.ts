/**
 * @description MAP T over K and produce T
 */
export const mapper = <T, K>(object: K): T => {
    let obj = {} as T;

    Object.keys(object).map(key => {
        if (instanceOf<T>(object, key)) {
            // @ts-ignore
            obj[key] = object[key];
        }
    });

    return obj;
};

function instanceOf<T>(object: any, key: string): object is T {
    return key in object;
}
