// Use this file to load jQuery into the current browser window

this.jQuery = $page('Load JQuery into Broswer', {
  load(driver) {
    inject(driver, "javascript:if(!window.jQuery||confirm('Overwrite\x20current\x20version?\x20v'+jQuery.fn.jquery))" +
            "(function(d,s){s=d.createElement('script');s.src='https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.js';" +
            '(d.head||d.documentElement).appendChild(s)})(document);');
  },
});
