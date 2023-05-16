export const getUser = (req, res) => {
  //   console.log(req.user.user.name)
  res.send(`Welcome ${req.user.user.name}`)
}
