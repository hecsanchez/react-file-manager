import {FC} from "react";
import {AssetNode} from "@/types";
import {Node} from "@/components";

interface NodeListProps {
    nodes: AssetNode[];
    onDoubleClick: (nodeId: number) => void;
    onSelect: (node: AssetNode) => void;
    selectedNodes: Array<AssetNode>;
    indeterminateNodes: Array<AssetNode>;
}

export const NodeList: FC<NodeListProps> = ({ nodes, onDoubleClick, onSelect, selectedNodes = [], indeterminateNodes = [] }) => {

    const buildTree = (nodes: Array<AssetNode>, parentId: number|null = null, level = 0): Array<AssetNode> => {
        return nodes
            .filter(node => node.parent_id === parentId)
            .map(node => ({
                ...node,
                level,
                children: buildTree(nodes, node.id, level + 1)
            }));
    }

    const handleDrag = () => {

    }

    const isSelected = (id: number): boolean => {
        return selectedNodes.some(node=>node?.id === id)
    }

    const isIndeterminate = (nodeId: number): boolean => {
        return indeterminateNodes?.find(indeterminateNode=>indeterminateNode?.id === nodeId)
    }

    return (
        <>
            {nodes?.map((node: AssetNode)=>(
                <div key={node.id}>
                    <Node
                        node={node}
                        onDrag={handleDrag}
                        onSelect={onSelect}
                        selected={isSelected(node.id)}
                        indeterminate={isIndeterminate(node.id)}
                        onDoubleClick={onDoubleClick}
                    />
                    {node.children ? (
                        <NodeList
                            nodes={node.children}
                            onDoubleClick={onDoubleClick}
                            selectedNodes={selectedNodes}
                            onSelect={onSelect}
                            indeterminateNodes={indeterminateNodes}
                        />
                    ) : null}
                </div>
            ))}
        </>
    )
}
