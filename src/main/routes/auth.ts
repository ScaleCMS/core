import { Router } from 'express'

export default (router: Router): void => {
  router.post('/api/auth/signup', (req, res) => {
    res.send({ data: 'any_data' })
  })
}
