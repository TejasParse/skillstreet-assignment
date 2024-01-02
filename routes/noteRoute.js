const express = require("express");
const notesController = require("../controller/notesController");
const router = express.Router();

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description: 
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created a new note.
 */
router.post("/", notesController.createNote);

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Fetch all notes
 *     responses:
 *       200:
 *         description: Fetched all Notes!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The title of the note.
 *                   description:
 *                     type: string
 *                     description: The description or content of the note.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the note was created.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the note was last updated.
 */
router.get("/", notesController.getNotes);

/**
 * @swagger
 * /api/notes/{noteId}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: noteId
 *        schema:
 *          type: string
 *        required: true
 *        description: This is the unique Note Id
 *     summary: Fetch Note by Note Id
 *     responses:
 *       200:
 *         description: Fetched Note!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the note.
 *                 description:
 *                   type: string
 *                   description: The description or content of the note.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the note was created.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the note was last updated.
 *       404:
 *        description: Note Not Found!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Note Not Found.
 */
router.get("/:id", notesController.getNoteById);

/**
 * @swagger
 * /api/notes/{noteId}:
 *   put:
 *     parameters:
 *      - in: path
 *        name: noteId
 *        schema:
 *          type: string
 *        required: true
 *        description: This is the unique Note Id
 *     summary: Update Notes by Note Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Update Note by Id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the note.
 *                 description:
 *                   type: string
 *                   description: The description or content of the note.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the note was created.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the note was last updated.
 */
router.put("/:id", notesController.updateNote);

/**
 * @swagger
 * /api/notes/{noteId}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: noteId
 *        schema:
 *          type: string
 *        required: true
 *        description: This is the unique Note Id
 *     summary: Delete Note by Note Id
 *     responses:
 *       200:
 *         description: Note Deleted!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Note Deleted Successfully Message.
 *       404:
 *        description: Note Not Found!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Note Not Found.
 */
router.delete("/:id", notesController.deleteNote);

module.exports = router;