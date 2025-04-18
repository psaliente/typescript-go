//// [tests/cases/compiler/incorrectNumberOfTypeArgumentsDuringErrorReporting.ts] ////

//// [incorrectNumberOfTypeArgumentsDuringErrorReporting.ts]
interface ObjA {
  y?:string,
}

interface ObjB {[key:string]:any}

interface Opts<A, B> {a:A, b:B}

const fn = <
  A extends ObjA,
  B extends ObjB = ObjB
>(opts:Opts<A, B>):string => 'Z'

interface MyObjA {
  x:string,
}

fn<MyObjA>({
  a: {x: 'X', y: 'Y'},
  b: {},
})


//// [incorrectNumberOfTypeArgumentsDuringErrorReporting.js]
const fn = (opts) => 'Z';
fn({
    a: { x: 'X', y: 'Y' },
    b: {},
});
