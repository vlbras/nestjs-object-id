import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class ParseObjectIdPipe
  implements PipeTransform<string, Types.ObjectId>
{
  constructor(private readonly errorMessage?: string) {}
  transform(value: string): Types.ObjectId {
    const isValidObjectId = Types.ObjectId.isValid(value);

    if (!isValidObjectId) {
      throw new BadRequestException(this.errorMessage || "Invalid ObjectId");
    }

    return new Types.ObjectId(value);
  }
}
