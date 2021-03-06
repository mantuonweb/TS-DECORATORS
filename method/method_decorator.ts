function get(relativeURL:string) {
    //trigger the decorator 
    console.log("get() deocrator: evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(relativeURL);
        var self=this;
        //old Method reference as a temp variable
        var orignalMethod=descriptor.value;
        descriptor.value=modifiedMethod;
        //spread using spread operator converts into the parameter
        function modifiedMethod(...args:any[]){
            //onvoke the orignal after monkey patching
            console.log(args);
            args[0].url="http://172.75.87.116/"+relativeURL;
            orignalMethod.apply(self,args);
        }
        //return modified one method
        return descriptor;
    }
}
class Emp {
    @get('/list')
    getEmployee(data:any) {
        console.log("inside the method",data);
        return "Hi";
    }
}
var c=new Emp();
c.getEmployee({data:'value'});