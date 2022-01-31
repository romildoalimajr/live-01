
class DatabaseError extends Error {
    
    constructor(
        public message: string,
        public erro?: any,
    ) {
        super(message);
    }
}

export default DatabaseError