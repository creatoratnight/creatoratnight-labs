import * as uuid from 'uuid';

export class Item {
    name: string;
    uId: string;
    children: Item[];
    itemType: string;
    fixed: boolean = false;
    addChildren: boolean = true;
    description: string = '';
    url: string;

    constructor(options: {
        name: string,
        itemType: string,
        children?: Item[],
        fixed?: boolean,
        addChildren?: boolean,
        description?: string,
        url?: string
    }) {
        this.name = options.name;
        this.uId = uuid.v4();
        this.children = options.children || [];
        this.itemType = options.itemType;
        this.fixed = options.fixed;
        this.addChildren = options.addChildren;
        this.description = '';
        this.url = options.url;
    }

    private newUid() {
        this.uId = uuid.v4();
    }
}