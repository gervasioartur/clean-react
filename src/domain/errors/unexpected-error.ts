export class UnexpectedError extends Error {
    constructor ( ){
        super('Ocorreu um erro. Tente novamente mais tarde! ')
        this.name = 'UnexpectedError'
    }
}