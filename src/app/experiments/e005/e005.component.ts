import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-e005',
  templateUrl: './e005.component.html',
  styleUrls: ['./e005.component.scss']
})

export class E005Component implements OnInit, OnChanges {

  public item: Item;
  public output;
  public get connectedDropListsIds(): string[] {
    // We reverse ids here to respect items nesting hierarchy
    return this.getIdsRecursive(this.item).reverse();
  }

  constructor() {
    this.item = new Item({ name: 'Document definition', itemType: 'object', addChildren: false });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateOuputJson();
  }

  onChange() {
    this.updateOuputJson();
    console.log('Hey!')
  }

  public ngOnInit() {
    this.item.children.push(new Item({
      name: 'properties',
      itemType: 'object',
      fixed: true,
      addChildren: true,
      children: [
        new Item({ name: 'persoonA', itemType: 'object', addChildren: true, children: [
          new Item({ name: 'contactgegevens', itemType: 'definition', url: 'http://' }),
        ] }),
        new Item({ name: 'persoonB', itemType: 'object', addChildren: true, children: [
          new Item({ name: 'contactgegevens', itemType: 'definition', url: 'http://' }),
        ] }),
        new Item({ name: 'externeDefinitie', itemType: 'object', addChildren: true, children: [
          new Item({ name: '$url', itemType: 'definition', url: 'http://' })
        ] })
      ]
    }));
    this.item.children.push(new Item({
      name: 'definitions', 
      itemType: 'object',
      fixed: true,
      addChildren: true,
      children: [
        new Item({ name: 'contactgegevens', itemType: 'object', addChildren: true, children: [
          new Item({ name: 'telefoonnummer', itemType: 'number'}),
          new Item({ name: 'email', itemType: 'string'}),
          new Item({ name: 'adres', itemType: 'definition', url: 'http://' }),
        ] }),
        new Item({ name: 'adres', itemType: 'object', addChildren: true, children: [
          new Item({ name: 'straat', itemType: 'string'}),
          new Item({ name: 'huisnummer', itemType: 'number'}),
          new Item({ name: 'huisletter', itemType: 'string'}),
          new Item({ name: 'huisnummerToevoeging', itemType: 'string'}),
          new Item({ name: 'postcode', itemType: 'string'}),
          new Item({ name: 'plaats', itemType: 'string'}),
        ] })
      ]
    }));
    this.updateOuputJson();
  }

  public onDragDrop(event: CdkDragDrop<Item>) {
    console.log('event: ', event);
    console.log('item: ', this.item);
    event.container.element.nativeElement.classList.remove('active');
    if (this.canBeDropped(event)) {
      const movingItem: Item = event.item.data;
      event.container.data.children.push(movingItem);
      event.previousContainer.data.children = event.previousContainer.data.children.filter((child) => child.uId !== movingItem.uId);
    } else {
      moveItemInArray(
        event.container.data.children,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private getIdsRecursive(item: Item): string[] {
    let ids = [item.uId];
    item.children.forEach((childItem) => { ids = ids.concat(this.getIdsRecursive(childItem)) });
    return ids;
  }

  private canBeDropped(event: CdkDragDrop<Item, Item>): boolean {
    const movingItem: Item = event.item.data;

    return event.previousContainer.id !== event.container.id
      && this.isNotSelfDrop(event)
      && !this.hasChild(movingItem, event.container.data);
  }

  private isNotSelfDrop(event: CdkDragDrop<Item> | CdkDragEnter<Item> | CdkDragExit<Item>): boolean {
    return event.container.data.uId !== event.item.data.uId;
  }

  private hasChild(parentItem: Item, childItem: Item): boolean {
    const hasChild = parentItem.children.some((item) => item.uId === childItem.uId);
    return hasChild ? true : parentItem.children.some((item) => this.hasChild(item, childItem));
  }

  public onAddItem(item) {
    item.children.push(new Item({ name: 'new-item', itemType: 'string', url: 'http://' }))
  }

  public onDuplicateItem([parentItem, item]) {
    let newItem = this.makeCopy(item);
    parentItem.children.push(newItem);
    let new_index = parentItem.children.findIndex((element) => element == item) + 1;
    this.array_move(parentItem.children, parentItem.children.length - 1 , new_index)
  }

  public onRemoveItem([parentItem, item]) {
    for (let i =0; i < parentItem.children.length; i++) {
      if (parentItem.children[i].uId === item.uId) {
        parentItem.children.splice(i, 1);
      }
    }
  }

  public onMoveItemUp([parentItem, item]) {
    let old_index = parentItem.children.findIndex((element) => element == item);
    this.array_move(parentItem.children, old_index, old_index - 1);
  }

  public onMoveItemDown([parentItem, item]) {
    let old_index = parentItem.children.findIndex((element) => element == item);
    this.array_move(parentItem.children, old_index, old_index + 1);
  }

  private makeCopy(item) {
    let newItem = new Item({ name: item.name, itemType: item.itemType, fixed: item.fixed, addChildren: item.addChildren });
    item.children.forEach((child) => {
      newItem.children.push(this.makeCopy(child))
    })
    console.log(this.item);
    return newItem;
  }

  private array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };

  private updateOuputJson() {
    this.output = this.generateOutputJson(this.item);
  }

  private generateOutputJson(item) {
    console.log('item: ', item);
    let json = {};
    if (item.itemType != 'definition') {
      json['type'] = item.itemType;
    }
    if (item.description != '') {
      json['description'] = item.description;
    }
    if (item.itemType == 'object') {
      let properties = {};
      for (let i = 0; i < item.children?.length; i++) {
        properties[item.children[i].name] = this.generateOutputJson(item.children[i]);
      } 
      json['properties'] = properties;
    }
    return json;
  }

}
