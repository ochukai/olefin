$(function() {

  var images = [];
  var defaultColumns = 5;
  var currentColumns = defaultColumns;

  function initImagePosition() {
    $('.image-wrapper img').each(function(index) {
      images.push({
        width: getWidth(defaultColumns),
        left: 0,
        top: 0,
        image: $(this)
      });
    });
  }

  function computePosition(columns, width) {
    images.forEach(function(item, index) {
      var relativeLeft = index % columns;
      var relativeTop = Math.floor(index / columns);

      item.left = relativeLeft * width;
      item.top = relativeTop * width;
      item.width = width;
    });
  }

  var $gallery = $('.gallery');

  function renderImages() {
    $gallery.empty();

    images.forEach(function(item, index) {
      var $div = $('<div class="img-wrapper"/>')
        .append('<div class="img-overlay" />')
        .append(item.image);

      $('<div />')
        .width(item.width)
        .height(item.width)
        .css({
          top: item.top,
          left: item.left
        })
        .append($div)
        .appendTo($gallery);
    });
  }

  function move() {
    $gallery.find('> div').each(function(index) {
      var image = images[index];
      var $this = $(this);
      $this
        .velocity({
          top: image.top,
          left: image.left,
          height: image.width,
          width: image.width,
        }, {
          duration: 500,
        });
    });

    //     var arr = [];
    //
    //     $gallery.find('div').each(function(index) {
    //       var image = images[index];
    //       var $this = $(this);
    //
    //       arr.push({
    //         elements: $this,
    //         properties: {
    //           top: image.top,
    //           left: image.left,
    //           height: image.width,
    //           width: image.width,
    //         }
    //       });
    //     });
    //     $.Velocity.RunSequence(arr);
  }

  function render() {
    $gallery.find('> div').each(function(index) {
      var image = images[index];
      var $this = $(this);

      $this.css({
        top: image.top,
        left: image.left,
        height: image.width,
        width: image.width,
      });
    });
  }

  const maxWidth = 400;
  const minWidth = 300;

  function getColumns() {
    var width = $(document).width();

    var columns = defaultColumns;
    var singleWidth = width / columns;

    while (singleWidth > maxWidth) {
      columns++;
      singleWidth = width / columns;
    }

    while (singleWidth < minWidth) {
      columns--
      singleWidth = width / columns;
    }

    if (columns <= 1) {
      columns = 1;
    }

    return columns;
  }

  function getWidth(columns = defaultColumns) {
    var width = $(window).width();
    return width / columns;
  }

  $(window).resize(_.debounce(function() {
    var columns = currentColumns = getColumns();
    var width = getWidth(columns);

    computePosition(columns, width);
    move();
  }, 250));

  $(window).resize(_.throttle(function() {
    var width = getWidth(currentColumns);
    computePosition(currentColumns, width);
    render();
  }, 50));

  initImagePosition();
  renderImages();

  var width = getWidth(defaultColumns);
  computePosition(defaultColumns, width);
  move();

});
