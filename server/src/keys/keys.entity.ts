import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Keys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column({
    nullable: true,
    name: 'nId',
  })
  nId: number;

  @Column('text')
  content: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;
}
