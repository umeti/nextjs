// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200
  res.setHeader("access-control-allow-origin","*")
  res.json({ name: 'John Doe' })
}
