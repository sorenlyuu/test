export interface UserInterface {
    /**
     * The username of the user
     */
    username: string
    /**
     * The password of the user , encoded in base64
     */
    password: string
    /**
     * The user's token
     */
    token: string
}