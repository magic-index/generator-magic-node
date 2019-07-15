import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint()
export class MaxLength implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {
    const [number] = args.constraints;
    return  value == null || (typeof value === "string" && value.length <= number)
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be shorter than or equal to ${args.constraints[0]} characters"`
  }

}

@ValidatorConstraint()
export class MinLength implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {
    const [number] = args.constraints;
    return  value == null || (typeof value === "string" && value.length >= number)
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be longer than or equal to ${args.constraints[0]} characters"`
  }

}

export default {
  MaxLength,
  MinLength
}
