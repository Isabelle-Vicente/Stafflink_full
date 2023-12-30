import { Router } from 'express'
import { DB } from '../models/Database.js'
const router = Router()

router.get('/', async (request, response) => {
    const registers = await DB.listRegister()
    
    response.status(200).json(registers)
})

router.post('/', async (request, response) => {
    const register = request.body

    await DB.createRegister(register)

    response.status(201).send()
})

router.put('/:id', async (request, response) => {
    const registerId = request.params.id
    const newData = request.body

    await DB.updateResgiter(registerId, newData)

    response.status(200).send()
})

export default router