const jsUndoRedo = require('./index')

let counter = 0
const addValue = (val) => counter += val
const removeValue = (val) => counter -= val

let tests = []
jsUndoRedo.execute(addValue, removeValue, 5)
tests.push(counter === 5 && jsUndoRedo.canUndo && !jsUndoRedo.canRedo)

jsUndoRedo.execute(addValue, removeValue, 3)
tests.push(counter === 8 && jsUndoRedo.canUndo && !jsUndoRedo.canRedo)

jsUndoRedo.execute(removeValue, addValue, 4)
tests.push(counter === 4 && jsUndoRedo.canUndo && !jsUndoRedo.canRedo)

jsUndoRedo.undo()
tests.push(counter === 8 && jsUndoRedo.canUndo && jsUndoRedo.canRedo)

jsUndoRedo.redo()
tests.push(counter === 4 && jsUndoRedo.canUndo && !jsUndoRedo.canRedo)

jsUndoRedo.undo()
tests.push(counter === 8 && jsUndoRedo.canUndo && jsUndoRedo.canRedo)

jsUndoRedo.undo()
tests.push(counter === 5 && jsUndoRedo.canUndo && jsUndoRedo.canRedo)

jsUndoRedo.execute(addValue, removeValue, 10)
tests.push(counter === 15 && jsUndoRedo.canUndo && !jsUndoRedo.canRedo)

jsUndoRedo.undo()
tests.push(counter === 5 && jsUndoRedo.canUndo && jsUndoRedo.canRedo)

jsUndoRedo.undo()
tests.push(counter === 0 && !jsUndoRedo.canUndo && jsUndoRedo.canRedo)

if (tests.some(_ => !_)) throw new Error('Test failed')
else console.log('All tests passed')