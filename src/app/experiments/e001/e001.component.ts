import { Component, ElementRef, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-e001',
  templateUrl: './e001.component.html',
  styleUrls: ['./e001.component.scss']
})
export class E001Component implements OnInit {
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
    let grid;
    let next;
    let history;
    let resolution = 16;
    let cols;
    let rows;

    p.setup = () => {
      p.createCanvas(p.floor((p.windowWidth-70)/resolution)*resolution, p.floor((p.windowHeight-350)/resolution)*resolution).parent('001-canvas');
      p.frameRate(30);
      cols = p.floor((p.windowWidth-70)/resolution);
      rows = p.floor((p.windowHeight-350)/resolution);
      grid = make2DArray(cols, rows);
      history = make2DArray(cols, rows);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j] = p.floor(p.random(2));
        }
      }
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          history[i][j] = 0;
        }
      }
    };

    p.draw = () => {
      //Draw grid
      p.background(0);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = (i * resolution);
          let y = (j * resolution);
          if (grid[i][j] == 1) {
            p.fill(253, 214, 23);
            //p.stroke(253, 214, 23);
            p.rect(x, y, resolution, resolution);
          } else if (history[i][j] > 0) {
            p.fill(history[i][j]);
            p.rect(x, y, resolution, resolution);
          }
        }
      }

      //Compute next frame
      next = make2DArray(cols, rows);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let count = countNeighbours(grid, i, j);
          let state = grid[i][j];
          history[i][j] = (history[i][j] * .975) + (state * 7);
          if (state == 0 && count == 3) {
            next[i][j] = 1;
          } else if (state == 1 && (count < 2 || count > 3)) {
            next[i][j] = 0;
          } else {
            next[i][j] = state;
          }
        }
      }

      grid = next;
    };

    function make2DArray(cols: number, rows: number) {
      let arr = new Array(cols);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
      }
      return arr;
    }

    function countNeighbours(grid, x, y) {
      let sum = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          let col = (x + i + cols) % cols;
          let row = (y + j + rows) % rows;
          sum += grid[col][row];
        }
      }
      sum -= grid[x][y];
      return sum;
    }
  };
}
