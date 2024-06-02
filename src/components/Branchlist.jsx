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
// import filterIcon from '../assets/svg/filter.svg';
import name_icon from '../assets/svg/stream_name.svg';
import student_count_icon from '../assets/svg/student_count.svg';
import subject_count_icon from '../assets/svg/subject_count.svg';
import date_icon from '../assets/svg/date.svg';
import degree_icon from '../assets/svg/degree.svg';
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
    ];
    const degreeNameArray = [
        {
            id : 1,
            degree_name : 'BE'
        },
        {
            id : 2,
            degree_name : 'ME'
        },
        {
            id : 3,
            degree_name : 'B.Tech'
        },
        {
            id : 4,
            degree_name : 'M.Tech'
        },
        {
            id : 5,
            degree_name : 'BBA'
        },
        {
            id : 6,
            degree_name : 'MBA'
        },
        {
            id : 7,
            degree_name : 'BCA'
        },
        {
            id : 8,
            degree_name : 'MCA'
        },
        {
            id : 9,
            degree_name : 'BSC'
        },
        {
            id : 10,
            degree_name : 'MSC'
        },
        {
            id : 11,
            degree_name : 'BA'
        },
        {
            id : 12,
            degree_name : 'MA'
        },
        {
            id : 13,
            degree_name : 'BS'
        },
        {
            id : 14,
            degree_name : 'MS'
        },
        {
            id : 15,
            degree_name : 'BE'
        },
        {
            id : 16,
            degree_name : 'B.com'
        },
        {
            id : 17,
            degree_name : 'M.com'
        }
    ];
    const [isSidebarVisible,setSidebarVisible] = useState(true);
    const [isAddstreamFieldVisible,setAddStreamFieldVisible] = useState(false);

    const [streamDetails,setStreamDetails] = useState({
        degree_name : '',
        stream_name : '',
        image_location : ''
    });

    function test(){
        console.log(streamDetails);
    }
    return(
        <div className={branchlistStyle.branches_container}>
            <aside style={{left:`${isSidebarVisible ? 0 : '-15rem'}`}}>
                <ul className={branchlistStyle.sidebarList}>
                    <li onClick={()=>setAddStreamFieldVisible(!isAddstreamFieldVisible)}><img src={addIcon} alt="add" />Add Stream</li>
                    <li className={branchlistStyle.sortby}> <span className={branchlistStyle.icon_and_name}><img src={sortIcon} alt="sort" />Sort by</span>
                        <ul className={branchlistStyle.sortbyList}>
                            <li><img src={name_icon} alt="stream_name" />Stream name</li>
                            <li><img src={student_count_icon} alt="student_count" />Student count</li>
                            <li><img src={subject_count_icon} alt="subject_count" />Subject count</li>
                            <li><img src={date_icon} alt="date_added" />Date added</li>
                            <li><img src={degree_icon} alt="degree" />Degree</li>
                        </ul>
                    </li>
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
                    <div className={branchlistStyle.input_fields}>
                        <label htmlFor="degree_name">Degree name</label>
                        <select onChange={(e)=>setStreamDetails({...streamDetails,degree_name:e.target.value})} name="degree_name" id="degree_name">
                            <option value="">Select degree</option>
                            {
                                degreeNameArray.map((obj)=>(
                                    <option key={obj.id} value={obj.degree_name}>{obj.degree_name}</option>
                                ))
                            }
                        </select>
                        <p className={branchlistStyle.degree_name_warn}>This field couldn't be empty!</p>
                    </div>
                    <div className={branchlistStyle.input_fields}>
                        <label htmlFor="stream_name">Stream name</label>
                        <input onChange={(e)=>setStreamDetails({...streamDetails,stream_name:e.target.value})} id='stream_name' name='stream_name' type="text" placeholder='Enter the stream name'/>
                        <p className={branchlistStyle.stream_name_warn}>This field couldn't be empty!</p>
                    </div>
                    <div className={branchlistStyle.input_fields}>
                        <p id='ref_image_display_area_label' className={branchlistStyle.ref_image_display_area_label}>Reference image</p>
                        <div className={branchlistStyle.ref_image_display_area}>
                            <span>
                                <img src={addIcon} alt="add" />
                                <p>Upload image</p>
                            </span>
                        </div>
                        <p className={branchlistStyle.image_upload_warning}>Couldn't upload image!</p>
                    </div>
                    <button onClick={()=>test()} type='button'>Save</button>
                </form>
            </section>
        </div>
    );
}
export default Branchlist;