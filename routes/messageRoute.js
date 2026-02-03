import express from 'express'
const router =express.Router()
import { getAllContacts,getChatPartners,getMessagesById,sendMessage } from '../controllers/messageController.js'
import { protectRoute } from '../middlewares/authMiddleware.js'

router.get('/contacts',protectRoute,getAllContacts)
router.get('/chats',protectRoute,getChatPartners)
router.get('/:id',protectRoute,getMessagesById)
router.post('/send/:id',protectRoute,sendMessage)

export default router