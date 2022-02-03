export default class forbiddenError extends Error {
    constructor(
        public message: string,
        public erro?: any,
    ) {
        super(message);
    }
}