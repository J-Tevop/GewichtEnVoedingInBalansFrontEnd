import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { iBlog } from '../types/iBlog'
import { IsNotEmpty } from 'class-validator'
import { Image } from './Image'

@Entity({ name: 'blogs' })
export class Blog implements iBlog {
  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @Column()
  title: string

  @IsNotEmpty()
  @Column()
  body: string

  @IsNotEmpty()
  @Column()
  summary: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Image, image => image.blog)
  images: Image[]
}
