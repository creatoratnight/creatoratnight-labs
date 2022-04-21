import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-e005',
  templateUrl: './e005.component.html',
  styleUrls: ['./e005.component.scss']
})

export class E005Component implements OnInit {

  public item: Item;
  public get connectedDropListsIds(): string[] {
    // We reverse ids here to respect items nesting hierarchy
    return this.getIdsRecursive(this.item).reverse();
  }

  constructor() {
    this.item = new Item({ name: 'parent-item', itemType: 'object' });
  }

  public ngOnInit() {
    this.item.children.push(new Item({
      name: 'test1',
      itemType: 'object',
      children: [
        new Item({ name: 'subItem1', itemType: 'string'}),
        new Item({ name: 'subItem2', itemType: 'number'}),
        new Item({ name: 'subItem3', itemType: 'array' }),
        new Item({ name: 'subItem3', itemType: 'boolean' }),
        new Item({ name: 'subItem3', itemType: 'object', children: [
          new Item({ name: 'subItem1', itemType: 'string'}),
          new Item({ name: 'subItem2', itemType: 'number'}),
          new Item({ name: 'subItem3', itemType: 'array' }),
        ] })
      ]
    }));
    this.item.children.push(new Item({
      name: 'test2', itemType: 'object',
      children: [
        new Item({ name: 'subItem4', itemType: 'string' }),
        new Item({ name: 'subItem5', itemType: 'string' }),
        new Item({
          name: 'subItem6', itemType: 'object', children: [
            new Item({ name: 'subItem8a', itemType: 'number' }),
            new Item({ name: 'subItem8b', itemType: 'number' }),
            new Item({ name: 'subItem8c', itemType: 'string' })
          ]
        })
      ]
    }));
    this.item.children.push(new Item({ name: 'test3', itemType: 'object' }));
    console.log(this.item);
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
    item.children.push(new Item({ name: 'new-item', itemType: 'object' }))
  }

  public onDuplicateItem([parentItem, item]) {
    let newItem = this.makeCopy(item);
    parentItem.children.push(newItem);
  }

  public onRemoveItem([parentItem, item]) {
    for (let i =0; i < parentItem.children.length; i++) {
      if (parentItem.children[i].uId === item.uId) {
        parentItem.children.splice(i, 1);
      }
    }
  }

  private makeCopy(item) {
    let newItem = new Item({ name: item.name, itemType: item.itemType });
    item.children.forEach((child) => {
      newItem.children.push(this.makeCopy(child))
    })
    return newItem;
  }

}
