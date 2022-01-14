const delay = async (milliseconds = 1000) => {
    await new Promise((r) => setTimeout(r, milliseconds));
}

module.exports = delay;