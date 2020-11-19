"use strict";

export default function debounceSeries(func,interval,immediate) {
  var timer;
  return function() {
    var context=this, args=arguments;
    var later=function() {
      timer=null;
      if ( !immediate )
      func.apply(context,args);
    };
    var callNow=immediate&&!timer;
    clearTimeout(timer);
    timer=setTimeout(later,interval);
    if ( callNow )
      func.apply(context,args);
  };
};