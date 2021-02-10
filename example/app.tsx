import { vdom, VDomComponent } from "../src";
import { State, todoAppStore, addTodoItem, changeName, setMousePosition } from "./todoAppStore";
import { TodoItemList } from "./todoItemList";
import { MouseRenderClass } from './mouseRender';

function addItem()
{
    const newItemText = prompt('New item text:');
    if (newItemText)
    {
        todoAppStore.execute(addTodoItem(newItemText));
    }
}

interface Props
{
    readonly nameField: string;
}
class TestComp extends VDomComponent<Props>
{
    public componentDidMount()
    {
        console.log('TestComp Mount');
    }

    public componentWillUnmount()
    {
        console.log('TestComp Unmount');
    }

    public render()
    {
        return <div>
            <strong>Name: </strong> {this.props.nameField}
            <button onclick={this.changeName}>Change Name</button>
        </div>
    }

    private changeName = () =>
    {
        const newName = prompt('Change name from: ' + this.props.nameField);
        todoAppStore.execute(changeName(newName));
    }
}

function onUpdateMouse(x: number, y: number)
{
    todoAppStore.execute(setMousePosition(x, y));
}

export function App(props: {state: State})
{
    const { state } = props;

    return <main>
        <h1>Todo App</h1>
        <p>
            <button onclick={addItem}>Add Item</button>
        </p>
        <div>
            <MouseRenderClass x={state.mouseX} y={state.mouseY} onUpdate={onUpdateMouse} />
        </div>
        { state.todoItems.length < 5 &&
        <p>
            <TestComp nameField={state.name} />
        </p> }
        <p>
            <TodoItemList items={state.todoItems} />
        </p>
    </main>;
}