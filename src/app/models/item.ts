import * as uuid from 'uuid';

export class Item {
    name: string;
    uId: string;
    children: Item[];
    itemType: string;

    constructor(options: {
        name: string,
        itemType: string,
        children?: Item[]
    }) {
        this.name = options.name;
        this.uId = uuid.v4();
        this.children = options.children || [];
        this.itemType = options.itemType;
    }

    private newUid() {
        this.uId = uuid.v4();
    }
}