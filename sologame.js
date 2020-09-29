let topDeck = ['1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2']
let bottomDeck = ['3', '4', '3', '4', '3', '4', '3', '4', '3', '4', '3', '4', '3', '4', '3', '4', '3', '4'];

let topHand = [];
let bottomHand = [];
let topDiscard = [];
let bottomDiscard = [];

function GamePlay () {
  function init() {
    $(document).on('click', '.card .content', function () {
      let index = $(this).parent().attr('data');
      if ($(this).parent().find('.box').is(':checked')) {
        $('#path').append('<p>*</p>')
      } else if ($(this).parent().find('.flip').is(':checked')) {
        let oldTop = topHand[index]
        let oldBottom = bottomHand[index]
        topHand[index] = oldBottom
        bottomHand[index] = oldTop
        populate();
        return;
      } else {
        topDiscard.push(topHand[index])
        bottomDiscard.push(bottomHand[Number(index)])
      }
      topHand.splice(index, 1)
      bottomHand.splice(index, 1)
      populate();
    })
    shuffle();
  }

  function shuffle () {
    topDeck = topDeck.sort(function () {
      return .5 - Math.random();
    });
    bottomDeck = bottomDeck.sort(function () {
      return .5 - Math.random();
    });
  }

  function populate() {
    $('#hand').html('')
    for (j = 0; j < topHand.length; j++) {
      let card = $('.card.template').clone();
      card.attr("data", j)
      card.removeClass('template')
      card.find('.top').text(topHand[j])
      card.find('.bottom').text(bottomHand[j])
      $('#hand').append(card);
    }
  }

  function draw() {
    for (i = 0; i < 3; i++) {
      if (topDeck.length === 0) {
        topDeck = topDiscard;
        bottomDeck = bottomDiscard;
        topDiscard = [];
        bottomDiscard = [];
        shuffle();
        topDeck.shift();
        bottomDeck.shift();
      }
      let top = topDeck.shift()
      let bottom = bottomDeck.shift()
      topHand.push(top);
      bottomHand.push(bottom);
    }
    populate();
    console.log(topDeck, topDiscard)
  }

  return {
    init: init,
    draw: draw
  }
};