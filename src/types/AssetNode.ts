import {AssetNodeKind} from "./AssetNodeKind.ts";


export interface AssetNode {
    id: number;
    name: string;
    kind: AssetNodeKind;
    location: string;
    type: string;
    parent_id: number;
    website_id: number;
    children?: Array<AssetNode>;
    level?: number;
    indeterminate?: boolean;
    selected?: boolean;
}
