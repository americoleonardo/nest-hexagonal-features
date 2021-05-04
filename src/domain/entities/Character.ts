import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({name: "character"})
export class Character {
  constructor(
    url,
    name,
    gender,
    culture,
    titles,
    aliases,
    father,
    mother,
    spouse,
    allegiances,
    books,
    povBooks,
    tvSeries,
    playedBy,
    createdAt = null
  ) {
    this.url = url;
    this.name = name;
    this.gender = gender;
    this.culture = culture;
    this.titles = titles;
    this.aliases = aliases;
    this.father = father;
    this.mother = mother;
    this.spouse = spouse;
    this.allegiances = allegiances;
    this.books = books;
    this.povBooks = povBooks;
    this.tvSeries = tvSeries;
    this.playedBy = playedBy;
    this.createdAt = createdAt ?? new Date().toISOString()
  }
  @ObjectIdColumn()
  id: any;

  @Column({ length: 200 })
  url: any;

  @Column({ length: 100 })
  name: any;

  @Column({ length: 10 })
  gender: any;

  @Column({ length: 100 })
  culture: any;

  @Column('text')
  titles: any;

  @Column('text')
  aliases: any;

  @Column({ length: 100 })
  father?: any;

  @Column({ length: 100 })
  mother?: any;

  @Column({ length: 100 })
  spouse?: any;

  @Column('text')
  allegiances: any;

  @Column('text')
  books: any;

  @Column('text')
  povBooks: any;

  @Column('text')
  tvSeries: any;

  @Column('text')
  playedBy?: any;

  @Column({ type: 'timestamptz' })
  createdAt: Date;
}
