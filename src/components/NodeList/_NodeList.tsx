import {FC} from "react";
import {AssetNode} from "@/types";
import {Node} from "@/components";

interface NodeListProps {
    nodes: AssetNode[];
    onDoubleClick: (node: AssetNode) => void;
    onSelect: (node: AssetNode) => void;
}

export const NodeList: FC<NodeListProps> = ({ nodes, onDoubleClick, onSelect }) => {

    const handleDrag = () => {

    }

    return (
        <>
            {nodes?.map((node: AssetNode)=>(
                <div key={node.id}>
                    <Node
                        node={node}
                        onDrag={handleDrag}
                        onSelect={onSelect}
                        onDoubleClick={onDoubleClick}
                    />
                    {node.children ? (
                        <NodeList
                            nodes={node.children}
                            onDoubleClick={onDoubleClick}
                            onSelect={onSelect}
                        />
                    ) : null}
                </div>
            ))}
        </>
    )
}
