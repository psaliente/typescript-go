//// [tests/cases/conformance/externalModules/es6/es6modulekindWithES5Target7.ts] ////

//// [es6modulekindWithES5Target7.ts]
export namespace N {
    var x = 0;
}

export namespace N2 {
    export interface I { }
}


//// [es6modulekindWithES5Target7.js]
export { N };
var N;
(function (N) {
    var x = 0;
})(N || (N = {}));
