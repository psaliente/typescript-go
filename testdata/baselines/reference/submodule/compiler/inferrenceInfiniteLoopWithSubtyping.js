//// [tests/cases/compiler/inferrenceInfiniteLoopWithSubtyping.ts] ////

//// [graphql-compose.d.ts]
export type ObjMapReadOnly<T> = Readonly<{ [key: string]: Readonly<T> }>;
export type Thunk<T> = (() => T) | T;

export type ComposeOutputTypeDefinition = Readonly<ObjectTypeComposer<any, any> | EnumTypeComposer>;

export class EnumTypeComposer {
  public setFields(fields: { [name: string]: { [key: string]: any } }): this;
}

export class ObjectTypeComposer<TSource, TContext> {
  public setFields(fields: ObjMapReadOnly<Resolver>): this;

  public addResolver<TResolverSource>(opts: { type?: Thunk<ComposeOutputTypeDefinition> }): this;
}

export class Resolver {
  public wrapArgs<NewContext>(
    cb: () => {
      [argName: string]: Thunk<Readonly<EnumTypeComposer>>;
    }
  ): void;

  public wrapType(cb: () => ComposeOutputTypeDefinition): void;
}


//// [app.ts]
import { ObjectTypeComposer } from './graphql-compose';

declare const User: ObjectTypeComposer<any, any>;

User.addResolver({
  type: User, // `User as any` fix the problem
});


//// [app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
User.addResolver({
    type: User, // `User as any` fix the problem
});
