import { ParseObjectIdPipe } from "@domain/criteria/validators/pipes/ParseObjectIdPipes";
import { BadRequestException } from "@nestjs/common";

describe('domain :: criteria :: validators :: pipes:: ParseObjectIdPipe', () => {
  test('should get id pipe exception', () => {
    try {
      const pipe = new ParseObjectIdPipe();

      pipe.transform("1234")
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e).toHaveProperty("message", "Invalid id 1234");
    }
  });
  test('should get a valid id', () => {
    const pipe = new ParseObjectIdPipe();

    expect(pipe.transform("6076fd3c2571de3aab1f6dfb")).toBeTruthy();
  });

});
