import { Component, ElementRef, OnInit } from '@angular/core';
import { translate } from '@angular/localize/src/utils';
import * as p5 from 'p5';

@Component({
  selector: 'app-e003',
  templateUrl: './e003.component.html',
  styleUrls: ['./e003.component.scss']
})
export class E003Component implements OnInit {

  private p5;

  constructor(private elementRef: ElementRef) {
  }

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
  }

  public resetCanvas = () => {
    this.p5.remove();
    this.createCanvas();
  }

  private drawing = function (p: any) {
    let x = 0.01;
    let y = 0;
    let z = 0;

    let a = 10;
    let b = 28;
    let c = 8/3;

    let rx = 0;
    let ry = 0;
    let rz = 0;

    let points = new Array();

    p.setup = () => {
      p.createCanvas(p.windowWidth-70, p.windowHeight-310, p.WEBGL).parent('003-canvas');
      p.frameRate(60);
    };

    p.draw = () => {
      p.background(0);

      let dt = 0.007;
      let dx = (a * (y - x)) * dt;
      let dy = (x * (b - z) - y) * dt;
      let dz = (x * y - c * z) * dt;
      x = x + dx;
      y = y + dy;
      z = z + dz;

      points.push(new p5.Vector(x, y, z));
      if (points.length > 2500) {
        points.shift();
      }

      // p.rotateX(rx);
      p.rotateY(ry);
      // p.rotateY(rz);
      // rx += .0001;
      ry += .005;
      // rz += .0001;

      p.scale(p.windowHeight/100);
      p.stroke(255);
      p.noFill();

      
      for (let i = 0; i < points.length - 1; i++) {
        p.beginShape();
        p.stroke(p.map(points[i].x, 0, 10, 253, 255), p.map(points[i].x, 0, 10, 214, 255), p.map(points[i].x, 0, 10, 23, 255));

        p.strokeWeight(3);
        p.vertex(points[i].x + 5, points[i].y -6, points[i].z - 28);
        p.vertex(points[i+1].x + 5, points[i+1].y -6, points[i+1].z - 28);
        p.endShape();
      }
    };
  };

}
