
declare class ArrayUtil {

  static composeIdentityFunction(
    identity : string | ((obj: { [s : string] : any }) => string) | undefined,
    allowUndefinedIds : true //identity can be undefined if you pass true here.
  ) : (obj: { [s: string] : any }) => string;

  static composeIdentityFunction(
    identity : string | ((obj: { [s : string] : any }) => string),
    allowUndefinedIds? : false
  ) : (obj: { [s: string] : any }) => string;

  /**
   * Removes objects that have the same identity. Objects with undefined identity are also removed.
   *  @param array
   *      Input array of objects.
   *  @param identity
   *      Specifies how to identify objects of the input array
   *          String value specifies the property name;
   *          Function value specifies a function composing an identity for an object
   *          Missing value means the string object itself to be used as identity.
   * @returns a new array.
   */
  static removeDuplicates(
    array: { [s: string] : any }[],
    identity: string | ((obj: { [s: string] : any }) => string)
  ) : any[];
}

export = ArrayUtil;
