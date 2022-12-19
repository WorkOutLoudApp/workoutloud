import { NextFunction, Request, RequestHandler, Response } from 'express'

export const getAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const sub = '105632997162122063510' //delete this line
  try {
    const token=req.body.token
    //TODO: check if req.body.token.sub found in the database
    if (token.sub === sub) {
      return res.json({ 
        verify: true,
     })
    }
    return res.json({ verify: false })
  } catch (err) {
    return next(err)
  }
}
