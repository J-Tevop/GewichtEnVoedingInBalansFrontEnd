export interface Blog {
  id: number
  title: string
  body: string
  summary: string
  created_at: string
}

export interface CreateBlog {
  id?: number
  title: string
  body: string
  summary: string
  created_at: string
}

export interface DeleteBlog {
  id?: number
}
