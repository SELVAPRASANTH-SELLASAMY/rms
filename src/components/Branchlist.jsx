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
import menuIcon from '../assets/svg/menu.svg';
import addIcon from '../assets/svg/add.svg';
import sortIcon from '../assets/svg/sort.svg';
import filterIcon from '../assets/svg/filter.svg';
import Stream from './Stream';
import { useState } from 'react';
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
    const [isSidebarVisible,setSidebarVisible] = useState(false);
    const [isAddstreamFieldVisible,setAddStreamFieldVisible] = useState(false);
    return(
        <div className={branchlistStyle.branches_container}>
            <aside style={{left:`${isSidebarVisible ? 0 : '-15rem'}`}}>
                <ul>
                    <li onClick={()=>setAddStreamFieldVisible(!isAddstreamFieldVisible)}><img src={addIcon} alt="add" />Add Stream</li>
                    <li><img src={sortIcon} alt="sort" />Sort by</li>
                    <li><img src={filterIcon} alt="filter" />Filter</li>
                </ul>
            </aside>
            <header>
                <h1>Streams</h1>
                <img onClick={()=>setSidebarVisible(!isSidebarVisible)} className={branchlistStyle.menuIcon} src={menuIcon} alt="menu" />
            </header>
            <main>
                {
                    streamArray.map((obj)=>(
                        <Stream key={obj.Id} deptName={obj.deptName} subject_count={obj.subject_count} student_count={obj.student_count} RefImage={obj.RefImage}/>
                    ))
                }
            </main>
            <section style={{top:`${isAddstreamFieldVisible ? '6rem' : '-40rem'}`}} className={branchlistStyle.addStream}>
                <form>
                    <h1>Add Stream</h1>
                    <label htmlFor="stream_name">Stream name</label>
                    <input id='stream_name' name='stream_name' type="text" placeholder='Enter the stream name'/>
                    <p className={branchlistStyle.stream_name_warn}>This field couldn't be empty!</p>
                    <p id='ref_image_display_area_label' className={branchlistStyle.ref_image_display_area_label}>Reference image</p>
                    <div className={branchlistStyle.ref_image_display_area}>
                        <span>
                            <img src={addIcon} alt="add" />
                            <p>Upload image</p>
                        </span>
                    </div>
                    <p className={branchlistStyle.image_upload_warning}>Couldn't upload image!</p>
                    <button type='button'>Save</button>
                </form>
            </section>
        </div>
    );
}
export default Branchlist;