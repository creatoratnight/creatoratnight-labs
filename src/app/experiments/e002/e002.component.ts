import { Component, ElementRef, OnInit } from '@angular/core';
import { translate } from '@angular/localize/src/utils';
import * as p5 from 'p5';

@Component({
  selector: 'app-e002',
  templateUrl: './e002.component.html',
  styleUrls: ['./e002.component.scss']
})
export class E002Component implements OnInit {
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
    let scl = 40;
    let w = p.windowWidth + 600;
    let h = 1600;
    let cols = w / scl + 1;
    let rows = h / scl + 1;

    let terrain = [];
    let travel = 0;

    let color = p.color(253, 214, 23);

    p.setup = () => {
      p.createCanvas(p.windowWidth-70, p.windowHeight-310, p.WEBGL).parent('002-canvas');
      //p.createCanvas(600, 600, p.WEBGL).parent('002-canvas');
      p.frameRate(30);
    };

    p.draw = () => {
      p.background(0);
      p.rotateX(p.PI / 3);
      p.translate(-w/2, -h/2);

      p.noFill();

      let yoff = 0;
      for (var x = 0; x < cols; x++) {
        let xoff = 0;
        terrain[x] = [];
        for (var y = 0; y < rows; y++) {
          terrain[x][y] = p.map(p.noise(xoff-travel, yoff), 0, 1, -250, 250);
          xoff+= 0.05;
        }
        yoff+= 0.05;
      }
      travel += .05;

      for (let y = 0; y < rows; y++) {
        color.setAlpha(y * 8);
        p.stroke(color);
        p.beginShape(p.TRIANGLE_STRIP);
        for (let x = 0; x < cols; x++) {
          p.vertex(x * scl, y * scl, terrain[x][y]);
          p.vertex(x * scl, (y + 1) * scl, terrain[x][y+1]);
        }
        p.endShape();
      }
    };
  };
}
