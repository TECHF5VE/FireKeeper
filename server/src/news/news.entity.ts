import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as moment from 'moment';
import { Transform, Expose } from 'class-transformer';

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

  @Column({
    name: 'weight',
    default: 1,
  })
  weight: number;

  @Column({
    name: 'star',
    default: 0,
  })
  star: number;

  @Transform(date => moment(date).format('YYYY-MM-DD HH:mm:ss'))
  @Column({
    type: 'timestamp',
  })
  createdAt: Date;

  @Transform(date => moment(date).format('YYYY-MM-DD HH:mm:ss'))
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  dismissAt: Date;

  @Column()
  sent: boolean;

  @Expose()
  createdAtFormat: string;

  @Expose()
  dismissAtFormat: string;

  constructor(partial: Partial<News>) {
    Object.assign(this, partial);
  }
}
