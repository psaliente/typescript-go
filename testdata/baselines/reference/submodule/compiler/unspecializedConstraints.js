//// [tests/cases/compiler/unspecializedConstraints.ts] ////

//// [unspecializedConstraints.ts]
module ts {
    interface Map<T> {
        [index: string]: T;
    }

    interface Equals<T> {
        equals(other: T): boolean;
    }

    class Symbol {
    }

    class Type extends Symbol {
        equals(that: Type): boolean {
            if (this === that) return true;
            if (!(this.isObjectType() && that.isObjectType())) return false;
            var propCount = that.getPropertyCount();
            if (propCount !== this.getPropertyCount()) return false;
            var sigCount = that.getSignatureCount();
            if (sigCount !== this.getSignatureCount()) return false;
            if (propCount) {
                for (var i = 0; i < propCount; i++) {
                    var thisProp = this.getProperty(i);
                    var thatProp = that.getPropertyByName(thisProp.name);
                    if (!(thatProp && thisProp.flags === thatProp.flags && thisProp.type.equals(thatProp.type))) return false;
                }
            }
            if (sigCount) {
                if (!setEquals(this.getSignatures(), that.getSignatures())) return false;
            }
            return true;
        }
        getProperties(): Property[] {
            return [];
        }
        getProperty(index: number): Property {
            return undefined;
        }
        getPropertyByName(name: string): Property {
            return undefined;
        }
        getPropertyCount(): number {
            return 0;
        }
        getSignature(index: number): Signature {
            return undefined;
        }
        getSignatureCount(): number {
            return 0;
        }
        getSignatures(): Signature[] {
            return [];
        }
        isPrimitive(): boolean {
            return false;
        }
        isObjectType(): boolean {
            return false;
        }
        isTypeParameter(): boolean {
            return false;
        }
        isSubTypeOf(type: Type) {
        }
    }

    class Property extends Symbol {
        constructor(public name: string, public type: Type, public flags: PropertyFlags) {
            super();
        }
        equals(other: Property): boolean {
            return this.name === other.name &&
                this.flags === other.flags &&
                this.type.equals(other.type);
        }
    }

    enum PropertyFlags {
        Optional = 1,
        Private = 2
    }

    class Signature extends Symbol {
        constructor(public typeParameters: TypeParameter[], public parameters: Parameter[], public returnType: Type) {
            super();
        }
        equalsNoReturn(other: Signature): boolean {
            return this.parameters.length === other.parameters.length &&
                this.typeParameters.length === other.typeParameters.length &&
                arrayEquals(this.parameters, other.parameters) &&
                arrayEquals(this.typeParameters, other.typeParameters);
        }
        equals(other: Signature): boolean {
            return this.equalsNoReturn(other) &&
                this.returnType.equals(other.returnType);
        }
    }

    class Parameter extends Symbol {
        constructor(public name: string, public type: Type, public flags: ParameterFlags) {
            super();
        }
        equals(other: Parameter) {
            return this.name === other.name &&
                this.flags === other.flags &&
                this.type.equals(other.type);
        }
    }

    enum ParameterFlags {
        Optional = 1,
        Rest = 2
    }

   
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    function getProperty<T>(map: Map<T>, key: string): T {
        if (!hasOwnProperty.call(map, key)) return undefined;
        return map[key];
    }

    function hasProperty<T>(map: Map<T>, key: string): boolean {
        return hasOwnProperty.call(map, key);
    }

    function arrayContains<T extends Equals<T>>(a: T[], item: T): boolean {
        var len = a.length;
        for (var i = 0; i < len; i++) {
            if (item.equals(a[i])) return true;
        }
        return false;
    }

    function arrayEquals<T extends Equals<T>>(a: T[], b: T[]): boolean {
        var len = a.length;
        if (b.length !== len) return false;
        for (var i = 0; i < len; i++) {
            if (!a[i].equals(b[i])) return false;
        }
        return true;
    }

    function setEquals<T extends Equals<T>>(a: T[], b: T[]): boolean {
        var len = a.length;
        if (b.length !== len) return false;
        for (var i = 0; i < len; i++) {
            if (!arrayContains(b, a[i])) return false;
        }
        return true;
    }
}


//// [unspecializedConstraints.js]
var ts;
(function (ts) {
    class Symbol {
    }
    class Type extends Symbol {
        equals(that) {
            if (this === that)
                return true;
            if (!(this.isObjectType() && that.isObjectType()))
                return false;
            var propCount = that.getPropertyCount();
            if (propCount !== this.getPropertyCount())
                return false;
            var sigCount = that.getSignatureCount();
            if (sigCount !== this.getSignatureCount())
                return false;
            if (propCount) {
                for (var i = 0; i < propCount; i++) {
                    var thisProp = this.getProperty(i);
                    var thatProp = that.getPropertyByName(thisProp.name);
                    if (!(thatProp && thisProp.flags === thatProp.flags && thisProp.type.equals(thatProp.type)))
                        return false;
                }
            }
            if (sigCount) {
                if (!setEquals(this.getSignatures(), that.getSignatures()))
                    return false;
            }
            return true;
        }
        getProperties() {
            return [];
        }
        getProperty(index) {
            return undefined;
        }
        getPropertyByName(name) {
            return undefined;
        }
        getPropertyCount() {
            return 0;
        }
        getSignature(index) {
            return undefined;
        }
        getSignatureCount() {
            return 0;
        }
        getSignatures() {
            return [];
        }
        isPrimitive() {
            return false;
        }
        isObjectType() {
            return false;
        }
        isTypeParameter() {
            return false;
        }
        isSubTypeOf(type) {
        }
    }
    class Property extends Symbol {
        name;
        type;
        flags;
        constructor(name, type, flags) {
            super();
            this.name = name;
            this.type = type;
            this.flags = flags;
        }
        equals(other) {
            return this.name === other.name &&
                this.flags === other.flags &&
                this.type.equals(other.type);
        }
    }
    let PropertyFlags;
    (function (PropertyFlags) {
        PropertyFlags[PropertyFlags["Optional"] = 1] = "Optional";
        PropertyFlags[PropertyFlags["Private"] = 2] = "Private";
    })(PropertyFlags || (PropertyFlags = {}));
    class Signature extends Symbol {
        typeParameters;
        parameters;
        returnType;
        constructor(typeParameters, parameters, returnType) {
            super();
            this.typeParameters = typeParameters;
            this.parameters = parameters;
            this.returnType = returnType;
        }
        equalsNoReturn(other) {
            return this.parameters.length === other.parameters.length &&
                this.typeParameters.length === other.typeParameters.length &&
                arrayEquals(this.parameters, other.parameters) &&
                arrayEquals(this.typeParameters, other.typeParameters);
        }
        equals(other) {
            return this.equalsNoReturn(other) &&
                this.returnType.equals(other.returnType);
        }
    }
    class Parameter extends Symbol {
        name;
        type;
        flags;
        constructor(name, type, flags) {
            super();
            this.name = name;
            this.type = type;
            this.flags = flags;
        }
        equals(other) {
            return this.name === other.name &&
                this.flags === other.flags &&
                this.type.equals(other.type);
        }
    }
    let ParameterFlags;
    (function (ParameterFlags) {
        ParameterFlags[ParameterFlags["Optional"] = 1] = "Optional";
        ParameterFlags[ParameterFlags["Rest"] = 2] = "Rest";
    })(ParameterFlags || (ParameterFlags = {}));
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function getProperty(map, key) {
        if (!hasOwnProperty.call(map, key))
            return undefined;
        return map[key];
    }
    function hasProperty(map, key) {
        return hasOwnProperty.call(map, key);
    }
    function arrayContains(a, item) {
        var len = a.length;
        for (var i = 0; i < len; i++) {
            if (item.equals(a[i]))
                return true;
        }
        return false;
    }
    function arrayEquals(a, b) {
        var len = a.length;
        if (b.length !== len)
            return false;
        for (var i = 0; i < len; i++) {
            if (!a[i].equals(b[i]))
                return false;
        }
        return true;
    }
    function setEquals(a, b) {
        var len = a.length;
        if (b.length !== len)
            return false;
        for (var i = 0; i < len; i++) {
            if (!arrayContains(b, a[i]))
                return false;
        }
        return true;
    }
})(ts || (ts = {}));
