function get(relativeURL:string) {
    //dec 
    console.log("get() deocrator: evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(relativeURL);
        var self=this;
        //Old Method reference as a temp variable
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
class C {
    @get('/list')
    getEmployee(data:any) {
        console.log("inside the method",data);
        return "Hi";
    }
}
var c=new C();
c.getEmployee({data:'value'});