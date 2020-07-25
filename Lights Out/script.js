class App {
  constructor(element, size){
    this.grid = this.initGrid(size);
    this.size = size;
    this.element = element;
    this.flip = this.flip.bind(this);
    this.element.addEventListener('click', this.flip);

    for(let r = 0; r < size; r++){
      for(let c = 0; c < size; c++){
        let div = document.createElement('div');
        div.style.width = (250/size) + 'px';
        div.style.height = (250/size) + 'px';
        div.dataset.location = JSON.stringify({r, c});
        element.appendChild(div);
      }
    }
  }

  render(r, c, delay){
    let div = this.element.children[r * this.size + c];
    div.className = this.grid[r][c] ? ('flip' + (delay ? ' flip-delay':'')): '';
  }

  initGrid(size){
    const grid = Array(size);
    for(let i = 0; i < grid.length; i++){
      grid[i] = Array(size).fill(false); // [false, false, false, false, false];
    }
    return grid;
  }

  flip(evt){
    const locationJSON = evt.target.dataset.location;
    if(!locationJSON){
      return;
    }
    const location = JSON.parse(locationJSON);
    const i = location.r;
    const j = location.c;
    this.grid[i][j] = !this.grid[i][j];
    this.render(i, j, false);
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
    for(let d of dirs){
      let ni = i + d[0];
      let nj = j + d[1];
      if(ni >= 0 && ni < this.size && nj >= 0 && nj < this.size){
        this.grid[ni][nj] = !this.grid[ni][nj];
        this.render(ni, nj, true);
      }
    }
  }
}

var usuario = prompt("¿De qué tamaño quieres el tablero?");
var size = parseInt(usuario);
new App(document.querySelector('#container'), size);
