class Studen {
    constructor(private id:string, private name:string, private faculty:string) {}

    getStudeninfo(){
        return `id ${this.id} name ${this.name} faculty ${this.faculty}`
    }
}

class Teacher {
    constructor(private name:string, private major:string){

    }
    getTeacherinfo(){
        return `name ${this.name} major ${this.major}`;
    }
    taech(studen:Studen){
        console.log(this.getTeacherinfo()+"สอน"+studen.getStudeninfo());
    }
}


 

class University {
    name:string;
    studens:Studen[];
    teachers: Teacher[];
    constructor(name:string,studens: Studen[],teachers:Teacher[]){
        this.studens = studens;
        this.teachers = teachers;
        this.name = name;
    }
     showUnovinfo(){
        console.log("ข้อมูลมหาลัย")
        console.log("teacher");
        console.log("univer name"+this.name);
        this.teachers.forEach(T=>{
            console.log(T.getTeacherinfo());
        });
        console.log("studen")
        this.studens.forEach((element) => {
            console.log(element.getStudeninfo());
        });

     }
}

const studen1 = new Studen("684245019","aaa","วิทยาศาสตร์และเทคโนโลยี")
const studen2 = new Studen("684245018","bbb","วิทยาศาสตร์และเทคโนโลยี")
const T1 = new Teacher("684245019","aaa")
const T2 = new Teacher("684245018","bbb")
const univ = new University("University10000",[studen1,studen2],[T1,T2]);
univ.showUnovinfo();

T1.taech(studen1);
T2.taech(studen2);
