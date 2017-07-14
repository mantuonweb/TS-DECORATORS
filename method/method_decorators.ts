class Dog {
    breed:string;

    constructor() {}

    @log
    setBreed(breed: string) { 
        this.breed=breed;
    }
}
function log(target: any, key: string, descriptor: any) {

    // store original descriptor method var 
    let originalMethod = descriptor.value;

    //editing the descriptor/value parameter 
    
    descriptor.value = function (...args: any[]) {
        var arguments = args.map((arg) => JSON.stringify(arg)).join();

        // we have to call original method and proxy the results back 
        var result = originalMethod.apply(this, args);

        var resultString = JSON.stringify(result);

        console.log(`Calling fn "${key}" with args: (${arguments}) , result: ${resultString}`);

        return result;

    }
    //return edited descriptor as opposed to overwriting
    //the descriptor by returning a new descriptor 
    return descriptor;
}

var dog=new Dog();
dog.setBreed("kutta");