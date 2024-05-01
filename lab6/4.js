type User = {
    id: string;
    name: string;
}

type Role = "student" | "teacher";

type Rate = 1 | 2 | 3 | 4 | 5;

type Level = "junior" | "middle" | "senior";

type Course = {
    id: number;
    title: string;
    role: Role;
    rate: Rate;
    level: Level;
}

type Student = User & {
    courses: { [id: number]: Omit<Course, "role"> & { role: Exclude<Role, "teacher"> } };
}


type Teacher = Partial<User> & {
    level?: Level;
    courses?: { [id: number]: Omit<Course, "role"> & { role: "teacher"; rate: Rate; level: Level } };
}

type Director = Partial<User> & {
    students?: { [id: string]: Partial<Student> };
    teachers?: { [id: string]: Partial<Teacher> };
}

/*--  Проверка  --*/
const t1: Teacher = {
    id: "t1",
    name: "t1",
    level: "junior",
    courses: {
        5: {
            id: 5,
            title: "Fifth",
            rate: 3,  
            role: "teacher", 
            level: "junior"  
        },
        1: {
            id: 1,
            title: "First",
            rate: 5,
            role: "teacher",
            level: "middle"
        }
    }
}

const d1: Director = {
    id: "d1",
    name: "d1",
    students: {
        s1: {
            id: "s1",
            name: "s1",
            courses: {
                1: {
                    id: 1,
                    title: "First",
                    rate: 5,
                    role: "student",
                    level: "middle"
                }
            }
        },
        s2: {
            id: "s2",
            name: "s2"
        }
    },
    teachers: {
        t1: {
            id: "t1",
            name: "t1",
            level: "junior",
            courses: {
                5: {
                    id: 5,
                    title: "Fifth",
                    rate: 3,
                    role: "teacher",
                    level: "junior"
                },
                1: {
                    id: 1,
                    title: "First",
                    rate: 5,
                    role: "teacher",
                    level: "middle"
                }
            }
        },
        t2: {
            id: "t2",
            name: "t2",
            level: "senior",
            courses: {
                1: {
                    id: 1,
                    title: "First",
                    rate: 5,
                    role: "teacher",
                    level: "middle"
                }
            }
        }
    }
}

const s1: Student = {
    id: "s1",
    name: "s1",
    courses: {
        1: {
            id: 1,
            title: "First",
            rate: 5,
            role: "student",
            level: "middle"
        }
    },
}


console.log(s1);
console.log(t1);
console.log(d1);