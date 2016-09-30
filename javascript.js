var svg = document.querySelector('main svg');
function getClass(){
  return (location.hash || '#mountain').slice(1);
}
function setClass(toAdd){
  svg.classList.remove('mountain', 'sea', 'beach');
  svg.classList.add(toAdd);
  location.hash = '#' + toAdd;
}
[].forEach.call(document.querySelectorAll('nav a'), function(link){
  link.addEventListener('click', function(e){
    var a = e.target;
    while ((a = a.parentNode) && a !== document && a.nodeName !== 'A') {}
    setClass(a.getAttribute('href').slice(1));
  });
});
var name = getClass();
setClass(name);


function touch(cb){
  var start;
  touch.callbacks = touch.callbacks || [];
  touch.callbacks.push(cb);
  if (touch.attached) return;
  touch.attached = true;
  document.addEventListener('touchstart', function(e){
    if (!e.touches.length) return;
    start = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  });
  document.addEventListener('touchend', function(e){
    if (!e.changedTouches.length) return;
    var end = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };
    var diff = { x: end.x - start.x, y: end.y - start.y };
    touch.callbacks.forEach(function(cb){
      cb(diff, start, end);
    });
  });
}

var list = ['mountain', 'sea', 'beach'];
touch(function(diff){
  if (diff.x < -100) {
    var name = getClass();
    var index = list.indexOf(name);
    if (index !== -1 && index != list.length - 1) {
      setClass(list[index + 1]);
    }
  }
  if (diff.x > 100) {
    var name = getClass();
    var index = list.indexOf(name);
    if (index >= 1) {
      setClass(list[index - 1]);
    }
  }
});
