import { Character } from '@domain/entities/Character';

describe('domain :: entities :: Character', () => {
  test('should return a character instance when receive valid values', () => {
    let character = new Character(
      "localhost",
      "111",
      "female",
      [],
      ["xpto"],
      ["xpto"],
      "father name",
      "mother name",
      "spouse",
      ["stark"],
      ["Game of thrones"],
      ["xpto"],
      ["1234"],
      "Character"
    );

    expect(character).toBeInstanceOf(Character);

    character = new Character(
      "localhost",
      "111",
      "female",
      [],
      ["xpto"],
      ["xpto"],
      "father name",
      "mother name",
      "spouse",
      ["stark"],
      ["Game of thrones"],
      ["xpto"],
      ["1234"],
      "Character",
      new Date().toISOString()
    );

    expect(character).toBeInstanceOf(Character);
  });
});
