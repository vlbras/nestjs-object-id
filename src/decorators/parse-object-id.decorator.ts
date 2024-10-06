import { BadRequestException } from "@nestjs/common";
import { Transform } from "class-transformer";
import { Types } from "mongoose";

export function ParseObjectId() {
  return Transform(
    ({ value, key }: { value: string; key: string }) => {
      if (!Types.ObjectId.isValid(value)) {
        throw new BadRequestException(`Invalid ObjectId for property "${key}": ${value}`);
      }
      return new Types.ObjectId(`${value}`);
    },
    {
      toClassOnly: true,
    }
  );
}
