const tic_tac_toe = {
  board: ['', '', '', '', '', '', '', '', ''],
  symbols: {
    options: ['X', 'O'],
    player: 0,
    turn_index: function () {
      this.player = (this.player == 1 ? 0 : 1);
      document.getElementById('warning').innerHTML = `Vez do player ${this.player + 1}`;
    }
  },

  winning_sequences: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ],

  game_container: null,
  gameover: false,

  init: function (mainDiv) {
    this.game_container = mainDiv;

    let styles = 'display: block;';
    document.getElementById('controls').setAttribute('style', styles);
  },

  // função que define a jogada de um player
  jogar: function (pos) {
    // para fazer uma jogada, é necessário verificar se o jogo ainda não gameover. 
    if (this.gameover)
      return false;
    if (this.board[pos] === '') {
      this.board[pos] = this.symbols.options[this.symbols.player];
      this.draw();
      // verifica se houve uma vitória. 
      let check_win = this.check_winning_sequences(this.symbols.options[this.symbols.player]);
      if (check_win >= 0) {
        this.check_end();
      }
      else
        this.symbols.turn_index();
      return true;
    }
    else {
      return false;
    }
  },

  // marca o game como encerrado
  check_end: function () {
    this.gameover = true;
    document.getElementById('warning').innerHTML = `Vitória do player ${this.symbols.player + 1}!`;
  },

  // verifica a cada jogada se houve um vencedor.
  check_winning_sequences: function (symbol) {
    for (i in this.winning_sequences) {
      if (this.board[this.winning_sequences[i][0]] == symbol &&
        this.board[this.winning_sequences[i][1]] == symbol &&
        this.board[this.winning_sequences[i][2]] == symbol
      ) {
        return i;
      }
    }
    return -1;
  },

  // renderiza o game no browser 
  draw: function () {
    let content = '';
    this.board.forEach((elem, index) => {
      content += `<div class="game-item" onClick="tic_tac_toe.jogar(${index})">${this.board[index]}</div>`;
    });
    this.game_container.innerHTML = content;
  },

  // reinicia o game 
  restart: function () {
    document.getElementById('warning').innerHTML = ''
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.symbols.player = 0;
    this.gameover = false;
    this.init(document.getElementById('game'));
    tic_tac_toe.draw();
  }
}