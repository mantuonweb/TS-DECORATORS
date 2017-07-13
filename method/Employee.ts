//Level for logging
var currentRole="admin";//"employee";
//function that return a mixing function
function role(roleType:string) {
    //mixing function
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        var self=this;
        //old Method reference as a temp variable
        var orignalMethod=descriptor.value;
        descriptor.value=modifiedMethod;
        //spread using spread operator converts into the parameter
        function modifiedMethod(...args:any[]){
            //invoke the orignal after monkey patching
            //console.log(args);
            var msg=args[0];
            var roles=roleType.split(",");
            if(roles.indexOf(currentRole)>=0){
                orignalMethod.apply(self,args);
            }
            else{
                console.log("Feature is not allowed for:"+currentRole);
            }
        }
        //return modified one method
        return descriptor;
    }
}
class Employee {
    @role("admin")
    add(user) {
        console.log("User Added",user);
    }
    @role("admin")
    delete(user){
        console.log("User deleted",user);
    }
    @role("employee,admin")
    read(user){
        console.log("User displayed",user);
    }
    @role("admin")
    edit(user){
        console.log("User edited",user);
    }
}
var emp=new Employee();
emp.add("info");
emp.delete("info");
emp.read("info");
emp.edit("info");