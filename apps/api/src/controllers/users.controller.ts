import { NextFunction, Request, RequestHandler, Response } from 'express'
import { dbPool } from '../database'

export const getUsers: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const query = `SELECT * FROM users WHERE email = $1 AND password = $2`
        const values = [req.body.email, req.body.password]
        await dbPool.query(query, values, (err: { stack: any; code: number }, result: { rows: any }) => {
            if (err) {
              console.log(err.stack)
              res.status(err.code)
            } else {
              console.log(result.rows)
              if (result.rows.length > 0) {
                  res.json({ verify: true })
              }
            }
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}