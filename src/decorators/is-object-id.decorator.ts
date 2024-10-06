import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import { Types } from "mongoose";

export function IsObjectId(
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: "isObjectId",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return Types.ObjectId.isValid(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `Invalid ObjectId for property "${args.property}": ${args.value}`;
        },
      },
    });
  };
}
