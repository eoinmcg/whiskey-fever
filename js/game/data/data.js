$.data = { title: 'Whiskey Fever' };


$.loadCallback = function(g) {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
      console.log('Successfully registered service worker', reg);
    }).catch(function(e) {
      console.warn('Error registering service worker', e);
    });
  }

  window.addEventListener('online', function(e) {
    console.log("online");
  }, false);

  window.addEventListener('offline', function(e) {
    console.log("offline");
  }, false);

  if (navigator.onLine) {
  } else {
  }

};
