import express from 'express'
import authController from '../controllers/auth.controller.js'

const router = express.Router()

/**
 * @openapi
 * '/api/users':
 *  get:
 *     tags:
 *     - User Authentication
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  name:
 *                    type: string
 *       400:
 *         description: Bad request
 */
router.get('/api/users', authController.findAllUser)

/**
 * @openapi
 * '/api/signup':
 *  post:
 *     tags:
 *     - User Authentication
 *     summary: User registration
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *                type: string
 *                default: Full Name
 *              email:
 *                type: string
 *                default: Email Address
 *              password:
 *                type: string
 *                default: Password
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */
router.post('/api/signup', authController.createUser)

/**
 * @openapi
 * '/api/signin':
 *  post:
 *     tags:
 *     - User Authentication
 *     summary: User login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: Email Address
 *              password:
 *                type: string
 *                default: Password
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      419:
 *        description: Invalid Entity Processing           
 */
router.post('/api/signin', authController.signIn)

/**
 * @openapi
 * '/api/signout':
 *  post:
 *      tags:
 *      - User Authentication
 *      summary: User signout
 */
router.post('/api/signout', authController.signOut)

/**
 * @openapi
 * '/api/password-reset/{email}':
 *  get:
 *    tags:
 *    - User Authentication
 *    summary: send password reset link to registered email
 *    operationId: email
 *    parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         schema:
 *          type: string
 *    responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      419:
 *        description: Invalid Entity Processing 
 */
router.get('/api/password-reset/:email', authController.forgotPassword)

/**
 * @openapi
 * '/password-reset/{email}/{token}':
 *  post:
 *     tags:
 *     - User Authentication
 *     summary: User password reset with email and sent token
 *     operationId: email
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *              - confirm_password
 *            properties:
 *              email:
 *                type: string
 *                default: Email Address
 *              password:
 *                type: string
 *                default: Password
 *              confirm_password:
 *                type: string
 *                default: Confirm Password
 *      responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      419:
 *        description: Invalid Entity Processing
 */
router.post('/api/password-reset/:email/:token', authController.resetPassword)

export default router