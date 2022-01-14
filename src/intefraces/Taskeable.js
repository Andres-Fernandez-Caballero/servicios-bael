class Taskeable {
    async execute() {
        throw Error('method have to be implemented');
    }
}

module.exports = Taskeable;
