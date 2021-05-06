const { Action, status, undoRedoManager } = require('./index')

let counter = 0
const addValue = (val) => counter += val
const removeValue = (val) => counter -= val

let tests = []
undoRedoManager.execute(new Action(addValue, removeValue, 5))
tests.push(counter === 5 && status.canUndo && !status.canRedo)

undoRedoManager.execute(new Action(addValue, removeValue, 3))
tests.push(counter === 8 && status.canUndo && !status.canRedo)

undoRedoManager.execute(new Action(removeValue, addValue, 4))
tests.push(counter === 4 && status.canUndo && !status.canRedo)

undoRedoManager.undo()
tests.push(counter === 8 && status.canUndo && status.canRedo)

undoRedoManager.redo()
tests.push(counter === 4 && status.canUndo && !status.canRedo)

undoRedoManager.undo()
tests.push(counter === 8 && status.canUndo && status.canRedo)

undoRedoManager.undo()
tests.push(counter === 5 && status.canUndo && status.canRedo)

undoRedoManager.execute(new Action(addValue, removeValue, 10))
tests.push(counter === 15 && status.canUndo && !status.canRedo)

undoRedoManager.undo()
tests.push(counter === 5 && status.canUndo && status.canRedo)

undoRedoManager.undo()
tests.push(counter === 0 && !status.canUndo && status.canRedo)

if (tests.some(_ => !_)) throw new Error('Test failed')
else console.log('All tests passed')