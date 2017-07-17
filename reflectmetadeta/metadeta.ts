import "reflect-metadata";
//https://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html#browserify
function serializeWith(serializer: (input: any) => string) : (target: any, propertyKey: string) => void {
    return function(target: any, propertyKey: string) {
        console.log("serializeWith called: adding metadata");
        Reflect.defineMetadata("serialization", serializer, target, propertyKey);
    }
}


function MyDateSerializer(value : any) : string {
    console.log("MyDateSerializer called");
    return "bla";
}

class Greeter {
    @serializeWith(MyDateSerializer)
    public greeting : string;

    constructor(message: string) {
        console.log("Greeter constructor");
        this.greeting = message;
    }
}

var greetingInstance = new Greeter("hi");

var serializerFunc : (input: any) => string = Reflect.getMetadata("serialization", greetingInstance, "greeting");

var serializedValue = serializerFunc(greetingInstance.greeting);
console.log(serializedValue);