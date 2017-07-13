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
//target means current object and key means which property
function currency(target:any,key:string){
    if (delete this[key]) {
    // Create new property with getter and setter
    var self=this;
    Object.defineProperty(target, key, {
      get: function(){
         return "$"+self[key]; 
      },
      set: function(value){
         self[key] = value;
      },
      enumerable: true,
      configurable: true
    });
  }
}

class AccountDetails { 
  @nameFormat
  public name: string;
  public surname: string;
  @currency
  public balance:number;
  constructor(name : string, surname : string ,balance : number) { 
    this.name = name;
    this.surname = surname;
    this.balance = balance;
  }
}

var p = new AccountDetails("Mantu", "Nigam",458);
p.name = "Mantu";
var n = p.name;
console.log(p.name,p.balance);