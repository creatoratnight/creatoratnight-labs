import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../../models/item';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  //TODO: Add other types
  types: Type[] = [
    {value: 'object', viewValue: 'Object'},
    {value: 'string', viewValue: 'String'},
    {value: 'number', viewValue: 'Number'},
    {value: 'array', viewValue: 'Array'},
    {value: 'boolean', viewValue: 'Boolean'},
  ];

  @Input() item: Item;
  @Input() parentItem?: Item;
  @Input() public set connectedDropListsIds(ids: string[]) {
    this.allDropListsIds = ids;
  }
  public get connectedDropListsIds(): string[] {
    return this.allDropListsIds.filter((id) => id !== this.item.uId);
  }
  public allDropListsIds: string[];

  public get dragDisabled(): boolean {
    return !this.parentItem;
  }

  public get parentItemId(): string {
    return this.dragDisabled ? '' : this.parentItem.uId;
  }


  @Output() itemDrop: EventEmitter<CdkDragDrop<Item>>
  @Output() addItem: EventEmitter<any> = new EventEmitter();
  @Output() duplicateItem: EventEmitter<any> = new EventEmitter();
  @Output() removeItem: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.allDropListsIds = [];
    this.itemDrop = new EventEmitter();
  }

  public onDragDrop(event: CdkDragDrop<Item, Item>): void {
    this.itemDrop.emit(event);
  }

  public onAddItem(item): void {
    this.addItem.emit(item);
  }

  public onDuplicateItem(item): void {
    this.duplicateItem.emit(item);
  }

  public onRemoveItem(item): void {
    this.removeItem.emit(item);
  }

  canDrop(itemType) {
    if (itemType === 'object' || itemType === 'array') {
      return () => {
        return true;
      }
    } else {
      return () => {
        return false;
      }
    }
  }

}

