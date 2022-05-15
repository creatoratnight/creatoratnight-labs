import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class ListItemComponent implements OnInit, OnChanges{
  //TODO: Add other types
  types: Type[] = [
    {value: 'object', viewValue: 'Object'},
    {value: 'string', viewValue: 'String'},
    {value: 'number', viewValue: 'Number'},
    {value: 'array', viewValue: 'Array'},
    {value: 'boolean', viewValue: 'Boolean'},
    {value: 'definition', viewValue: 'Definition'},
  ];

  @Input() item: Item;
  @Input() parentItem?: Item;
  @Input() definitions?: Item;
  @Input() public set connectedDropListsIds(ids: string[]) {
    this.allDropListsIds = ids;
  }
  public get connectedDropListsIds(): string[] {
    return this.allDropListsIds.filter((id) => id !== this.item.uId);
  }
  public allDropListsIds: string[];

  public get dragDisabled(): boolean {
    return !this.parentItem || this.item.fixed;
  }

  public get parentItemId(): string {
    return this.dragDisabled ? '' : this.parentItem.uId;
  }

  public currentIndex;
  public selected: Boolean = false;

  @Output() itemDrop: EventEmitter<CdkDragDrop<Item>>
  @Output() addItem: EventEmitter<any> = new EventEmitter();
  @Output() duplicateItem: EventEmitter<any> = new EventEmitter();
  @Output() removeItem: EventEmitter<any> = new EventEmitter();
  @Output() moveItemUp: EventEmitter<any> = new EventEmitter();
  @Output() moveItemDown: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.allDropListsIds = [];
    this.itemDrop = new EventEmitter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setCurrentIndex();
    if (this.item.children.length == 0 && this.item.itemType == 'array') {
      this.item.children.push(new Item({ name: '', itemType: 'object', fixed: true, addChildren: true }))
    }
    if (this.item.children.length == 0 && this.item.itemType == 'object') {
      this.item.addChildren = true;
    }
    if (this.item.children.length > 0 && this.item.itemType != 'array' && this.item.itemType != 'object') {
      this.item.children = [];
    }
    this.change.emit();
  }

  ngOnInit(): void {
    this.setCurrentIndex();
  }

  public onDragDrop(event: CdkDragDrop<Item, Item>): void {
    this.itemDrop.emit(event);
    this.setCurrentIndex();
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

  public onMoveItemUp(item): void {
    this.moveItemUp.emit(item);
    this.setCurrentIndex();
  }

  public onMoveItemDown(item): void {
    this.moveItemDown.emit(item);
    this.setCurrentIndex();
  }

  private setCurrentIndex() {
    if (this.parentItem?.children?.length > 0) {
      this.currentIndex = this.parentItem.children.findIndex((element) => element == this.item);
    }
  }

  public onSelect() {
    if (!this.dragDisabled) {
      this.selected = !this.selected;
    }
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

