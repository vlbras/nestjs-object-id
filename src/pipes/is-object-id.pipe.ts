import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class IsObjectIdPipe implements PipeTransform<string, string> {
  constructor(private readonly errorMessage?: string) {}

  transform(value: string): string {
    const isValidObjectId = Types.ObjectId.isValid(value);

    if (!isValidObjectId) {
      throw new BadRequestException(this.errorMessage || "Invalid ObjectId");
    }

    return value;
  }
}
