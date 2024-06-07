import branchlistStyle from './css/branchlist.module.css';
import menuIcon from '../assets/svg/menu.svg';
import addIcon from '../assets/svg/add.svg';
import sortIcon from '../assets/svg/sort.svg';
import name_icon from '../assets/svg/stream_name.svg';
import student_count_icon from '../assets/svg/student_count.svg';
import subject_count_icon from '../assets/svg/subject_count.svg';
import date_icon from '../assets/svg/date.svg';
import degree_icon from '../assets/svg/degree.svg';
import Stream from './Stream';
import Addstream from './Addstream';
import { useEffect, useState, useRef } from 'react';
import Axios from 'axios';
function Branchlist(){
    const [isSidebarVisible,setSidebarVisible] = useState(false);
    const [isAddstreamFieldVisible,setAddStreamFieldVisible] = useState(false);
    const [updateRequestId,setUpdateRequestId] = useState(null);
    const [fetchedStreamDetails,setFetchedStreamDetails] = useState(null);

    const streamForm = useRef();

    function getStreams(){
        Axios.get('http://localhost:3001/getstreams')
        .then((res)=>{
            if(res.status !== 200){
                console.log(res.data.message);
            }
            else{
                setFetchedStreamDetails(res.data);
                console.log(res.data);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        getStreams();
    },[]);
    // function test(){
    //     console.log(streamDetails);
    // }

    return(
        <div className={branchlistStyle.branches_container}>
            <aside style={{left:`${isSidebarVisible ? 0 : '-15rem'}`}}>
                <ul className={branchlistStyle.sidebarList}>
                    <li onClick={()=>{setAddStreamFieldVisible(!isAddstreamFieldVisible);streamForm.current.reset();setUpdateRequestId(null);setSidebarVisible(false)}}><img src={addIcon} alt="add" />Add Stream</li>
                    <li className={branchlistStyle.sortby}> <span className={branchlistStyle.icon_and_name}><img src={sortIcon} alt="sort" />Sort by</span>
                        <ul onClick={()=>setSidebarVisible(false)} className={branchlistStyle.sortbyList}>
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
                    fetchedStreamDetails && fetchedStreamDetails.map((obj)=>(
                        <Stream key={obj._id} id={obj._id} deptName={obj.streamname} subject_count={obj.subject_count} student_count={obj.student_count} RefImage={obj.RefImage} getStreams={getStreams} setUpdateRequestId={setUpdateRequestId} setAddStreamFieldVisible={setAddStreamFieldVisible}/>
                    ))
                }
            </main>
            <Addstream getStreams={getStreams} setAddStreamFieldVisible={setAddStreamFieldVisible} isAddstreamFieldVisible={isAddstreamFieldVisible} updateRequestId={updateRequestId} fetchedStreamDetails={fetchedStreamDetails} streamForm={streamForm}/>
        </div>
    );
}
export default Branchlist;