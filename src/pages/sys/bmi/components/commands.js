class ChangePositionCommand {
    constructor(property, distance) {
        this.property = property; // 如：'left'
        this.distance = distance; // 如： 10
    }

    execute(state) {
        const newState = { ...state }
        newState[this.property] += this.distance;
        return newState;
    }

    undo(state) {
        const newState = { ...state }
        newState[this.property] -= this.distance;
        return newState;
    }
}


export default ChangePositionCommand