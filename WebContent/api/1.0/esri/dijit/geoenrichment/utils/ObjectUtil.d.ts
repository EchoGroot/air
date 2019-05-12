
declare class ObjectUtil  {
  /**
   * applies all properites from a source object to a target object.
   * traverses inner objects.
   * @param targetObject target object (object to write to)
   * @param sourceObject source object (object to write from)
   * @param overwrite If false, doesn't override existing non-object properties. Default - false.
   * @returns Object targetObject.
   */
  static populateObject(targetObject: Object, sourceObject: Object, overwrite?: boolean) : Object;

  /**
   * traverses all values of the passed object and its inner objects
   * processFunc([any value])
   */
  static traverseObject(obj : Object, processFunc : (value: any) => void) : void;
  
  /**
   * Formats a number in the current locale removing trailing zeroes
   * after the fractional separator.
   *
   * @param value a number to format.
   * 
   * @param params Either the number of places after the fractional separator or
   *      an object with properties:
   *      places: Number
   *          The number of places after the fractional separator.
   *      locale: String
   *          The required locale. If missing, the current locale is applied.
   *      preserveTrailingZeroes: Boolean
   *          Preserve trailing zeroes after the decimal point or not.
   *          Trailing zeroes are remove by default.
   *      noSeparator: Boolean
   *          Don't use thousand separator.
   *          Thousand separator is added by default.
   */
  static formatNumber(
    value: number,
    params: number | {
      places: number,
      locale?: string,
      preserveTrailingZeroes?: boolean,
      noSeparator?: boolean
    }
  ) : string;

  /**
   * Copies own properties of the source object to the target object. A shallow copying is applied.
   * Own functions and undefined values are not copied.
   *  @param source Object
   *      A source object.
   *  @param target: Object | undefined
   *      A target object. If missing, a new target object is created.
   *  @param conversionCallback: function (property, value):*
   *      Optional conversion callback applied to Object-type properties.
   *      If it is missing, these properties are assigned as is.
   *      If object-type property should be ignored, the callback should return an undefined value.
   * @returns the target object
   */
  static copyOwnJsonProperties(
    source : Object,
    target?: Object | undefined,
    conversionCallback? : (property: string, value: any) => any
  ) : Object;

  /**
   * Rounds a number to the specified places after decimal
   */
  static roundNumber(value: number, places?: number) : number;

}

export = ObjectUtil;
