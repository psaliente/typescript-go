//// [tests/cases/compiler/sourceMapForFunctionWithCommentPrecedingStatement01.ts] ////

//// [sourceMapForFunctionWithCommentPrecedingStatement01.ts]
function P() {
    // Test this
    var a = 1;
}

//// [sourceMapForFunctionWithCommentPrecedingStatement01.js]
function P() {
    // Test this
    var a = 1;
}
