import {AssetNodeKind} from "./AssetNodeKind.ts";

export interface AssetNodeDTO {
    id: number;
    name: string;
    kind: AssetNodeKind;
    location: string;
    type: string;
    parent_id: number;
    website_id: number;
}

export interface AssetNode extends AssetNodeDTO {
    children?: Array<AssetNode>;
    level?: number;
    indeterminate?: boolean;
    selected?: boolean;
}
