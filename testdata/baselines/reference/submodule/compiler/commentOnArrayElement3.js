//// [tests/cases/compiler/commentOnArrayElement3.ts] ////

//// [commentOnArrayElement3.ts]
const array = [
    /* element 1*/
    1
    /* end of element 1 */,
    2
    /* end of element 2 */, ,
    /* extra comment */
];

//// [commentOnArrayElement3.js]
const array = [
    /* element 1*/
    1
    /* end of element 1 */ ,
    2
    /* end of element 2 */ ,
    ,
    /* extra comment */
];
