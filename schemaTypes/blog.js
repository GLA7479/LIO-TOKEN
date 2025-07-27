export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'content', type: 'text', title: 'Content' },
    { name: 'date', type: 'datetime', title: 'Date' }
  ]
}