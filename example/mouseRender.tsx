import { vdom, VDomComponent } from "../src";

interface Props
{
    readonly x: number;
    readonly y: number;
    readonly onUpdate: (x: number, y: number) => void;
}

export class MouseRenderClass extends VDomComponent<Props>
{
    componentDidMount() {
        window.addEventListener('mousemove', this.onMouseMove)
    }
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.onMouseMove)
    }

    onMouseMove = (e: MouseEvent) => {
        this.props.onUpdate(e.clientX, e.clientY);
    }

    public render()
    {
        return <span>
            Class Mouse X: {this.props.x} Mouse Y: {this.props.y}
        </span>
    }
}