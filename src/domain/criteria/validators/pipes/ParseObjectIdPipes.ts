import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectID } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectID> {
  transform(value: any): ObjectID {
    if (!ObjectID.isValid(value)) {
      throw new BadRequestException(`Invalid id ${value}`);
    }

    return ObjectID.createFromHexString(value);
  }
}