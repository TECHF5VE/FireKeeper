import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  image: string;

  @Column('text')
  content: string;

  @Column()
  position: string;

  @Column('text')
  keywords: string;

  @Column('text')
  sentiment: string;

  @Column('float')
  weight: number;

  @Column({
    type: 'timestamp',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  dismissAt: Date;
}
