import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { iBlog } from '../types/iBlog'

@Entity({ name: 'blogs' })
export class Blog implements iBlog {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  body: string

  @Column()
  summary: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
