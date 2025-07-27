export default {
  name: 'tokenomics',
  type: 'document',
  title: 'Tokenomics',
  fields: [
    { name: 'category', type: 'string', title: 'Category' },
    { name: 'percentage', type: 'number', title: 'Percentage' },
    { name: 'amount', type: 'string', title: 'Amount' }
  ]
}