//sources :https://robertnyman.com/javascript/javascript-getters-setters.html

function nameFormat(target: any, key: string) {
  if (delete this[key]) {
    // Create new property with getter and setter
    var self=this;
    Object.defineProperty(target, key, {
      get: function(){
         return self[key].toUpperCase(); 
      },
      set: function(value){
         self[key] = value;
      },
      enumerable: true,
      configurable: true
    });
  }
}

class Person1 { 
  @nameFormat
  public name: string;
  public surname: string;

  constructor(name : string, surname : string) { 
    this.name = name;
    this.surname = surname;
  }
}

var p = new Person1("remo", "Jansen");
p.name = "Remo";
var n = p.name;
console.log(n);