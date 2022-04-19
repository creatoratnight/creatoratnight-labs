import { Component, ElementRef, OnInit } from '@angular/core';
import { translate } from '@angular/localize/src/utils';
import * as p5 from 'p5';

@Component({
  selector: 'app-e004',
  templateUrl: './e004.component.html',
  styleUrls: ['./e004.component.scss'],
})
export class E004Component implements OnInit {
  private p5;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.createCanvas();
    console.log(this.p5);
  }

  ngOnDestroy(): void {
    this.p5.remove();
    this.elementRef.nativeElement.remove();
  }

  private createCanvas = () => {
    this.p5 = new p5(this.drawing);
  };

  public resetCanvas = () => {
    this.p5.remove();
    this.createCanvas();
  };

  private drawing = function (p: any) {
    let tree = [];
    let size = 12;
    let white = 100;

    p.setup = () => {
      p.createCanvas(p.windowWidth - 70, p.windowHeight - 350, p.WEBGL).parent(
        '004-canvas'
      );
      p.frameRate(30);
      p.colorMode(p.HSB, 100);
      p.angleMode(p.DEGREES);
      const start = p.createVector(0, 0, 0);
      const end = p.createVector(0, -p.height / 4.5, 0);
      tree[0] = new Branch(start, end);
      growTree();
      growTree();
      growTree();
      growTree();
      growTree();
      growTree();
      growTree();
      growLeaves();
      setLeaveSize();
    };

    p.draw = () => {
      p.background(0);
      p.rotateY(p.frameCount / 5);
      p.translate(0, p.height / 2, 0);
      for (let i = 0; i < tree.length; i++) {
        tree[i].show();
      }
    };

    function growTree() {
      for (let i = tree.length - 1; i >= 0; i--) {
        if (!tree[i].finished) {
          tree[i].size = size;
          tree[i].color = white;
          let angle = p.random(-180, 180);
          tree.push(tree[i].branchA(angle));
          tree.push(tree[i].branchB(angle));
          let ran = Math.floor(p.random(0, 6));
          if (ran > 2) {
            tree.push(tree[i].branchC(angle));
          }
        }
        tree[i].finished = true;
      }
      size /= 1.3;
      white -= 5;
    }

    function growLeaves() {
      for (let i = tree.length - 1; i >= 0; i--) {
        if (!tree[i].finished) {
          tree[i].size = size;
          tree[i].color = white;
          tree.push(tree[i].leaf());
        }
        tree[i].finished = true;
      }
    }

    function setLeaveSize() {
      for (let i = tree.length - 1; i >= 0; i--) {
        if (!tree[i].finished) {
          tree[i].size = 20;
          tree[i].color = p.color(13.89, p.random(90, 100), p.random(70, 100));
        }
      }
    }

    function Branch(begin, end) {
      this.begin = begin;
      this.end = end;
      this.finished = false;
      this.size = 20;
      this.type = 0;
      this.color = 255;

      this.show = function () {
        if (this.type == 0){
          p.stroke(this.color);
          p.strokeWeight(this.size);
          p.line(
            this.begin.x,
            this.begin.y,
            this.begin.z,
            this.end.x,
            this.end.y,
            this.end.z
          );
        } else {
          p.stroke(this.color);
          p.strokeWeight(this.size);
          p.line(
            this.begin.x,
            this.begin.y,
            this.begin.z,
            this.end.x,
            this.end.y,
            this.end.z
          );
        }
        
      };

      this.branch = function (forkAngle, twistAngle) {
        let initialDirection = p5.Vector.sub(this.end, this.begin);
        let forkAxis = findPerpendicular(initialDirection);
        let branchDirection = rotateAround(
          initialDirection,
          forkAxis,
          forkAngle
        );

        branchDirection = rotateAround(
          branchDirection,
          initialDirection,
          twistAngle
        );
        branchDirection.mult(p.random(.7,.8));

        let newEnd = p5.Vector.add(this.end, branchDirection);
        return new Branch(this.end, newEnd);
      };

      this.leaf = function () {
        let initialDirection = p5.Vector.sub(this.end, this.begin);
        let newEnd = p5.Vector.add(this.end, initialDirection);
        let leaf = new Branch(this.end, newEnd);
        leaf.type = 1;
        return leaf;
      };

      this.branchA = function (twistAngle) {
        return this.branch(45, twistAngle);
      };

      this.branchB = function (twistAngle) {
        return this.branch(-15, twistAngle);
      };

      this.branchC = function (twistAngle) {
        return this.branch(p.random(-45, 45), twistAngle);
      };
    }

    function findPerpendicular(vect) {
      const xAxis = p.createVector(1, 0, 0);
      const zAxis = p.createVector(0, 0, 1);

      if (p.abs(vect.angleBetween(xAxis)) > 0) {
        return p5.Vector.cross(xAxis, vect);
      } else {
        return p5.Vector.cross(zAxis, vect);
      }
    }

    function rotateAround(vect, axis, angle) {
      axis = p5.Vector.normalize(axis);
      return p5.Vector.add(
        p5.Vector.mult(vect, p.cos(angle)),
        p5.Vector.add(
          p5.Vector.mult(p5.Vector.cross(axis, vect), p.sin(angle)),
          p5.Vector.mult(
            p5.Vector.mult(axis, p5.Vector.dot(axis, vect)),
            1 - p.cos(angle)
          )
        )
      );
    }
  };
}
