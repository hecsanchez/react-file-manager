import {useEffect, useState} from "react";
import {NodeList} from "./components/NodeList";
import {getAssetNodeChildren, getAssetNodes} from "./services/assetNode.ts";
import {AssetNode} from "./types";

const siteId = 1;

function App() {
    const [nodes, setNodes] = useState<Array<AssetNode>>([])

    const buildTree = (nodes: Array<AssetNode>, parentId: number|null = null, level = 0): Array<AssetNode> => {
        return nodes
            .filter(node => node.parent_id === parentId)
            .map(node => ({
                ...node,
                level,
                children: buildTree(nodes, node.id, level + 1)
            }));
    }

    const handleDoubleClick = async (node: AssetNode) => {
        if (nodes.some(existingNode=> existingNode.parent_id === node.id)) return

        const response = await getAssetNodeChildren(siteId, node.id)
        setNodes(prevState=> {
            let newNodes = response;
            if (node.selected) {
                newNodes = response.map(node => ({...node, selected: true}))
            }
            return [...prevState, ...newNodes]
        })
    }


    useEffect(()=>{
       const getNodes = async() => {
            try {
                const response = await getAssetNodes(siteId);
                setNodes(response);
            } catch(e) {

            }
        }
        getNodes();
    }, [])

    const handleSelect = (node: AssetNode): void => {
        const isNodeSelected = node.selected;

        const deselectNode = (prevState: AssetNode[]): AssetNode[] => {
            node.selected = false;
            return prevState.map(prevNode => {
                if (prevNode.id === node.parent_id) {
                    return {
                        ...prevNode,
                        indeterminate: isParentIndeterminate(node),
                        selected: isParentSelected(node)
                    }
                } else if (prevNode.id === node.id) {
                    return {
                        ...prevNode,
                        ...node,
                        children: prevNode.children?.map(childNode => ({
                            ...childNode,
                            selected: false
                        }))
                    }
                }

                return prevNode;
            });
        }

        const selectNode = (prevState: AssetNode[]): AssetNode[] => {
            node.selected = true;
            return prevState.map(prevNode => {
                if (prevNode.id === node.parent_id) {
                    return {
                        ...prevNode,
                        indeterminate: isParentIndeterminate(node),
                        selected: isParentSelected(node)
                    }
                } else if (prevNode.id === node.id) {
                    return {
                        ...prevNode,
                        ...node,
                        children: prevNode.children?.map(childNode => ({
                            ...childNode,
                            selected: true
                        }))
                    }
                }

                return prevNode;
            });
        }


        if (isNodeSelected) {
            setNodes(deselectNode);
        } else {
            setNodes(selectNode);
        }
    }

    const isParentIndeterminate = (node: AssetNode): boolean => {
        const children = nodes.filter(child => child.parent_id === node.parent_id);
        const selectedChildren = children.filter(child => {
            if (child.id === node.id) return node.selected;
            return child.selected
        });

        if (selectedChildren.length === children.length) return false;

        return selectedChildren.length > 0 && selectedChildren.length < children.length;
    };

    const isParentSelected = (node: AssetNode): boolean => {
        const children = nodes.filter(child => child.parent_id === node.parent_id);
        const selectedChildren = children.filter(child => {
            if (child.id === node.id) return node.selected;
            return child.selected
        });
        if (selectedChildren.length === children.length) return true;
    }

  return (
    <div className="max-w-4xl m-auto my-12">
      <NodeList
          nodes={buildTree(nodes)}
          onDoubleClick={handleDoubleClick}
          onSelect={handleSelect}
      />
    </div>
  )
}

export default App
