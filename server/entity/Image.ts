import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Blog } from '../entity/Blog'
import { iImage } from '../types/iImage'

@Entity({ name: 'images' })
export class Image implements iImage {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  url: string

  @ManyToOne(() => Blog, blog => blog.images)
  blog: Blog
}
