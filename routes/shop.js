import express, { Router } from 'express'
import { getDb } from '../Backend/dataBase.js'
import { generateRandomId } from '../Backend/generate.js'

const router = express.Router()
const db = getDb()

router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.items)
})

router.post('/', async (req, res) => {
    let newItem = req.body
    await db.read()
    newItem.id = generateRandomId()
    db.data.items.push(newItem)
    await db.write()
    res.status(200).send({ id: newItem.id })

})

router.delete('/:id', async (req, res) => {
    let id = Number(req.params.id)
    await db.read()
    let newItemIndex = db.data.items.findIndex(item => item.id === id)
    if (newItemIndex === -1) {
        res.sendStatus(404)
        return
    }
    db.data.items.splice(newItemIndex, 1) // Ta bort objektet från arrayen
    await db.write() // Uppdatera databasen
    res.sendStatus(200)
})


export default router