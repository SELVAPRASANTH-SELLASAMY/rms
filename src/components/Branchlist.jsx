import ITImage from '../assets/Information_technology.jpg';
import CSEImage from '../assets/computer_science.jpg';
import MechImage from '../assets/mechanical_engineering.jpg';
import MechatImage from '../assets/mechatronics_engineering.jpg';
import EEEImage from '../assets/electrical_and_electronics_engineering.jpg';
import ECEImage from '../assets/ECE.jpg';
import EIEImage from '../assets/EIE.jpg';
import CivilImage from '../assets/Civil.jpg';
import AutoImage from '../assets/automobile.jpg';
import branchlistStyle from './css/branchlist.module.css';
import Stream from './Stream';
function Branchlist(){
    const streamArray = [
        {
            Id : 1,
            deptName : "Computer Science",
            subject_count : 8,
            student_count : 250,
            RefImage : CSEImage
        },
        {
            Id : 2,
            deptName : "Information Technology",
            subject_count : 8,
            student_count : 250,
            RefImage : ITImage
        },
        {
            Id : 3,
            deptName : "Mechanical Engineering",
            subject_count : 8,
            student_count : 120,
            RefImage : MechImage
        },
        {
            Id : 4,
            deptName : "Mechatronics Engineering",
            subject_count : 8,
            student_count : 120,
            RefImage : MechatImage
        },
        {
            Id : 5,
            deptName : "Electrical and Electronics Engineering",
            subject_count : 8,
            student_count : 245,
            RefImage : EEEImage
        },
        {
            Id : 6,
            deptName : "Electronics and Communication Engineering",
            subject_count : 8,
            student_count : 240,
            RefImage : ECEImage
        },
        {
            Id : 7,
            deptName : "Electronics and Instrumentation Engineering",
            subject_count : 8,
            student_count : 205,
            RefImage : EIEImage
        },
        {
            Id : 8,
            deptName : "Civil Engineering",
            subject_count : 8,
            student_count : 98,
            RefImage : CivilImage
        },
        {
            Id : 9,
            deptName : "Automobile Engineering",
            subject_count : 8,
            student_count : 79,
            RefImage : AutoImage
        }
    ]
    return(
        <div className={branchlistStyle.branches_container}>
            <header>
                <h1>Streams</h1>
            </header>
            <main>
                {
                    streamArray.map((obj)=>(
                        <Stream key={obj.Id} deptName={obj.deptName} subject_count={obj.subject_count} student_count={obj.student_count} RefImage={obj.RefImage}/>
                    ))
                }
            </main>
        </div>
    );
}
export default Branchlist;