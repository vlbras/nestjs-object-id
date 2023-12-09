# nestjs-object-id

[![npm](https://img.shields.io/npm/v/nestjs-object-id.svg)](https://www.npmjs.com/package/nestjs-object-id)
[![license](https://img.shields.io/github/license/vlbras/nestjs-object-id.svg)](https://www.npmjs.com/package/nestjs-object-id)
[![downloads](https://img.shields.io/npm/dt/nestjs-object-id.svg)](https://www.npmjs.com/package/nestjs-object-id)

MongoDB ObjectId validator and parser for NestJS

## Installation

```
npm install nestjs-object-id
```

## Usage

### @IsObjectId()
@IsObjectId() is a decorator for validating MongoDB Object IDs in DTOs.
<br>Here is an example along with commonly used `IsString` and `IsNotEmpty` from [class-validator](https://github.com/typestack/class-validator) package.

```ts
import { IsObjectId } from 'nestjs-object-id';
import { IsString, IsNotEmpty } from 'class-validator';

class UpdatePostDTO {
    @IsObjectId()
    authorId: string;

    @IsString()  
    @IsNotEmpty()
    title: string;
}
```

### IsObjectIdPipe
IsObjectIdPipe is a pipe for validating MongoDB Object IDs in route parameters. 
```ts
import { IsObjectIdPipe } from 'nestjs-object-id';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.postsService.findOne(id);
  }
}
```

### ParseObjectIdPipe
ParseObjectIdPipe extends the functionality of IsObjectIdPipe by converting string parameters into Types.ObjectId instances. 
```ts
import { ParseObjectIdPipe } from 'nestjs-object-id';
import { Types } from 'mongoose';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.postsService.findOne(id);
  }
}
```

## Author

**Vladyslav Braslavskyi [GitHub](https://github.com/vlbras)**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
