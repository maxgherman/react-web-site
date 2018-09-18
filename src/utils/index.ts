
type Action = (item: any) => { };

const idxf = (o: {} | null | undefined, ...actions: Action[]) =>
    (actions || [])
        .filter((item) => item)
        .reduce((acc, curr) => acc ? curr(acc) : null, o);

export const idxf5 = <TData, T1, T2, T3, T4, TResult>(
    data: TData,
    f1: (a: TData) => T1,
    f2: (a: T1) => T2,
    f3: (a: T2) => T3,
    f4: (a: T3) => T4,
    f5: (a: T4) => TResult) =>
        idxf(data, f1, f2, f3, f4, f5) as TResult;

export const idxf4 = <TData, T1, T2, T3, TResult>(
    data: TData,
    f1: (a: TData) => T1,
    f2: (a: T1) => T2,
    f3: (a: T2) => T3,
    f4: (a: T3) => TResult) =>
        idxf(data, f1, f2, f3, f4) as TResult;

export const idxf3 = <TData, T1, T2, TResult>(
    data: TData,
    f1: (a: TData) => T1,
    f2: (a: T1) => T2,
    f3: (a: T2) => TResult) =>
        idxf(data, f1, f2, f3) as TResult;

export const idxf2 = <TData, T1, TResult>(
    data: TData,
    f1: (a: TData) => T1,
    f2: (a: T1) => TResult) =>
        idxf(data, f1, f2) as TResult;
