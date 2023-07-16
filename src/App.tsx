import {useEffect, useState} from "react";
import {NodeList} from "./components/NodeList";
import {getAssetNodeChildren, getAssetNodes} from "./services/assetNode.ts";
import {AssetNode} from "./types";

const siteId = 1;

function App() {
    const [nodes, setNodes] = useState<Array<AssetNode>>([])
    const [selectedNodes, setSelectedNodes] = useState<Array<AssetNode>>([]);
    const [indeterminateNodes, setIndeterminateNodes] = useState<Array<AssetNode>>([]);

    const buildTree = (nodes: Array<AssetNode>, parentId: number|null = null, level = 0): Array<AssetNode> => {
        return nodes
            .filter(node => node.parent_id === parentId)
            .map(node => ({
                ...node,
                level,
                children: buildTree(nodes, node.id, level + 1)
            }));
    }

    const handleDoubleClick = async (nodeId: number) => {
        if (nodes.find(node=> node.parent_id === nodeId)) return
        const response = await getAssetNodeChildren(siteId, nodeId)
        setNodes(prevState=> [...prevState, ...response])
        if (selectedNodes.some(node=>node.id === nodeId)) {
            setSelectedNodes(prevState => ([...prevState, ...response]))
        }
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
        if (selectedNodes.some(selectedNode=>selectedNode.id === node.id)) {
            if (node.children) {
                const childrenToRemove = node.children.map(child=>child.id);
                setSelectedNodes(prevState => prevState.filter(selectedNode => selectedNode?.id !== node.id && !childrenToRemove.includes(selectedNode?.id)))
            } else {
                setSelectedNodes(prevState => prevState.filter(selectedNode => selectedNode?.id !== node.id))
            }
        } else {
            if(node.children) {
                setSelectedNodes(prevState => ([...prevState, node, ...(node.children as Array<AssetNode>)]))
            } else {
                setSelectedNodes(prevState => ([...prevState, node]))
            }
        }
    }

    const setParentAsIndeterminate = (parentId: number|null) => {
        const childrenIds = nodes.filter(node=>node.parent_id === parentId).map(node=>node.id);
        const selectedChildren = selectedNodes.filter(node => childrenIds.includes(node?.id));
        const parentNode = nodes.find(node=>node.id === parentId) as AssetNode;
        const isParentSelected = selectedNodes.some(node=>node.id === parentId);

        if (selectedChildren?.length === childrenIds?.length && isParentSelected || !parentNode) return;

        if (selectedChildren?.length !== 0 && selectedChildren?.length < childrenIds?.length) {
            setIndeterminateNodes(prevState => ([...prevState, parentNode]));
            if (isParentSelected) {
                setSelectedNodes(prevState => prevState.filter(selectedNode => selectedNode?.id !== parentId))
            }
        } else if (selectedChildren?.length === childrenIds?.length) {
            setIndeterminateNodes(prevState  => prevState.filter(indeterminateNode => indeterminateNode?.id !== parentId));
            setSelectedNodes(prevState => ([...prevState, parentNode]))
        } else {
            setIndeterminateNodes(prevState  => prevState.filter(indeterminateNode => indeterminateNode?.id !== parentId));
        }
    }

    useEffect(()=>{
        nodes.forEach((node)=>{
            if (node.parent_id) {
                setParentAsIndeterminate(node?.parent_id);
            }
        })
    }, [selectedNodes])


  return (
    <div className="max-w-4xl m-auto my-12">
      <NodeList
          nodes={buildTree(nodes)}
          onDoubleClick={handleDoubleClick}
          onSelect={handleSelect}
          selectedNodes={selectedNodes}
          indeterminateNodes={indeterminateNodes}
      />
    </div>
  )
}

export default App
