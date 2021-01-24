
export default (req, res) => {
  res.statusCode = 200
  res.setHeader("access-control-allow-origin","toos.top")
  res.json({ name: 'John Doe' })
}
