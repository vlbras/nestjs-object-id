import { Transform } from "class-transformer";
import { Types } from "mongoose";

export function ToObjectId() {
  return Transform(({ value }) => new Types.ObjectId(`${value}`), {
    toClassOnly: true,
  });
}
