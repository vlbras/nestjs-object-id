# nestjs-object-id

[![npm](https://img.shields.io/npm/v/nestjs-object-id.svg)](https://www.npmjs.com/package/nestjs-object-id)
[![license](https://img.shields.io/github/license/vlbras/nestjs-object-id.svg)](https://www.npmjs.com/package/nestjs-object-id)
[![npm downloads](https://img.shields.io/npm/dt/nestjs-object-id.svg)](https://www.npmjs.com/package/nestjs-object-id)

## Description

This package provides an efficient way to validate and parse ObjectIds for NestJS applications that interact with MongoDB and supports a wide range of architectures and patterns, including REST APIs, GraphQL, DTOs and Microservices.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Pipes](#pipes)
  - [IsObjectIdPipe](#isobjectidpipe)
  - [ParseObjectIdPipe](#parseobjectidpipe)
  - [GraphQL](#graphql)
  - [Microservices](#microservices)
- [Decorators](#decorators)
  - [@IsObjectId()](#isobjectid)
  - [@ParseObjectId()](#parseobjectid)

## Installation

```
npm install nestjs-object-id
```

## Pipes

### IsObjectIdPipe

IsObjectIdPipe is a pipe for validating MongoDB ObjectIds in route parameters. 
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

> **WARNING** To work with Pipes correctly, make sure you have @nestjs/common@10.2.7 or higher installed.

If an invalid 'id' is received, an error will be thrown:

```ts
{
    "message": "Invalid ObjectId",
    "error": "Bad Request",
    "statusCode": 400
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

> **HINT** To log request and response activity clearly and efficiently, you can install [nesjs-http-logger](https://www.npmjs.com/package/nestjs-http-logger).

### GraphQL

You can use IsObjectIdPipe and ParseObjectIdPipe with GraphQL.        
Example of using IsObjectIdPipe with GraphQL:

```ts
import { IsObjectIdPipe } from 'nestjs-object-id';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => Post)
  post(@Args('id', IsObjectIdPipe) id: string) {
    return this.postsService.findOne(id);
  }
}
```


### Microservices

You can use IsObjectIdPipe and ParseObjectIdPipe with Microservices.        
Example of using IsObjectIdPipe with Microservices:

```ts
import { IsObjectIdPipe } from 'nestjs-object-id';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @MessagePattern('find_post')
  findOne(@Payload('id', IsObjectIdPipe) id: string) {
    return this.postsService.findOne(id);
  }
}
```

## Decorators

### @IsObjectId()
@IsObjectId() is a decorator for validating MongoDB ObjectIds in DTOs.        
Here is an example along with commonly used `IsString` and `IsNotEmpty` from [class-validator](https://github.com/typestack/class-validator) package.

```ts
import { IsObjectId } from 'nestjs-object-id';
import { IsString, IsNotEmpty } from 'class-validator';

class CreatePostDto {
    @IsObjectId()
    authorId: string;

    @IsString()  
    @IsNotEmpty()
    title: string;
}
```

If an invalid 'authorId' is received, an error will be thrown:

```ts
{
  message: ["authorId must be an MongoDB ObjectId instance"],
  error: "Bad Request",
  statusCode: 400
}
```

### @ParseObjectId()
@ParseObjectId() is a decorator for parsing MongoDB ObjectIds in DTOs.        
Here is an example along with commonly used `IsString` and `IsNotEmpty` from [class-validator](https://github.com/typestack/class-validator) package.

```ts
import { IsObjectId } from 'nestjs-object-id';
import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

class CreatePostDto {
    @ParseObjectId()
    authorId: Types.ObjectId;;

    @IsString()  
    @IsNotEmpty()
    title: string;
}
```

If an invalid 'authorId' is received, an error will be thrown:

```ts
{
  message: ["authorId must be an MongoDB ObjectId instance"],
  error: "Bad Request",
  statusCode: 400
}
```

## Author

**Vladyslav Braslavskyi [GitHub](https://github.com/vlbras)**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
