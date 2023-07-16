import {FC, useState} from "react";
import {AssetNode} from "../../types";
import {Node} from "../Node/_Node.tsx";

interface NodeListProps {
    nodes: AssetNode[]
}

export const NodeList: FC<NodeListProps> = ({ nodes }) => {
    const [selectedNodes, setSelectedNodes] = useState<number[]>([]);

    const handleDrag = () => {

    }

    const handleSelect = (id: number): void => {
        if (isSelected(id)) {
            setSelectedNodes(prevState => prevState.filter(nodeId => nodeId !== id))
        } else {
            setSelectedNodes(prevState => ([...prevState, id]))
        }
    }

    const isSelected = (id: number): boolean => {
        return selectedNodes.includes(id)
    }

    const areChildrenSelected = (id: number): boolean => {
         // TODO: Add logic for checking if children are selected
        return false
    }

    return (
        <div>
            {nodes.map((node: AssetNode)=>(
                <Node
                    node={node}
                    onDrag={handleDrag}
                    onSelect={handleSelect}
                    selected={isSelected(node.id)}
                    childrenSelected={areChildrenSelected(node.id)}
                />
            ))}
        </div>
    )
}
