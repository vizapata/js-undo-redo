function Action(theAction, theUndoAction, theActionValue) {
  this.execute = theAction
  this.undo = theUndoAction
  this.value = theActionValue
}

const ACTIONS_TO_KEEP = 50
const status = {
  canUndo: false,
  canRedo: false
}

const actionTracker = {
  list: [],
  _pointer: -1,
  get index() { return this._pointer },
  set index(val) {
    this._pointer = val
    status.canUndo = this.index >= 0
    status.canRedo = this.index < this.list.length - 1
  },
  add(action) {
    this.list.splice(this.index + 1)
    this.list.push(action)
    this.index++
    if (this.index >= ACTIONS_TO_KEEP) {
      this.list.shift()
      this.index--
    }
    return action.execute(action.value)
  },
  undo() {
    const action = this.list[this.index]
    this.index--
    return action.undo(action.value)
  },
  redo() {
    const action = this.list[this.index + 1]
    this.index++
    return action.execute(action.value)
  }
}

const undoRedoManager = {
  execute: (action) => {
    if (!(action instanceof Action)) throw new Error('The parameter is not a valid action', action)
    return actionTracker.add(action)
  },
  undo: () => {
    if (status.canUndo) return actionTracker.undo()
  },
  redo: () => {
    if (status.canRedo) return actionTracker.redo()
  }
}

exports.Action = Action
exports.status = status
exports.undoRedoManager = undoRedoManager