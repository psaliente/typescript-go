//// [tests/cases/compiler/circularResolvedSignature.ts] ////

//// [circularResolvedSignature.ts]
declare function useState<S>(initialState: (() => S)): [S, (s: S) => void];

type Data = Readonly<{
    value: number;
    foo: (arg: any) => void;
    bar: (arg: any) => void;
}>;

export function Component() {
    const [state, setState] = useState<Data>(() => ({
        value: "string", // this should be a number
        foo: (arg) => setState(arg),
        bar: (arg) => setState(arg),
    }));
}


//// [circularResolvedSignature.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = Component;
function Component() {
    const [state, setState] = useState(() => ({
        value: "string", // this should be a number
        foo: (arg) => setState(arg),
        bar: (arg) => setState(arg),
    }));
}
