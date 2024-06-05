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
import { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
function Branchlist(){
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
    const [isSidebarVisible,setSidebarVisible] = useState(false);
    const [isAddstreamFieldVisible,setAddStreamFieldVisible] = useState(false);
    const [streamDetails,setStreamDetails] = useState({
        degreename : '',
        streamname : '',
        RefImage : ''
    });

    const [fetchedStreamDetails,setFetchedStreamDetails] = useState(null);

    const refImageInputField = useRef();
    const refImageDisplayArea = useRef();
    const streamForm = useRef();
    const response_message = useRef();
    const degree_name_warn = useRef();
    const stream_name_warn = useRef();
    const image_upload_warn  = useRef();

    function setRefImage(e){
        var formData = new FormData();
        formData.append('reference_image',e.target.files[0]);
        Axios.post('http://localhost:3001/uploadImages',formData)
        .then((res)=>{
            image_upload_warn.current.style.visibility = res.status !== 200 ? 'visible' : 'hidden';
            if(res.status === 200){
                setStreamDetails({...streamDetails,RefImage:res.data.path});
                const reader = new FileReader();
                reader.onloadend = () =>{
                    refImageDisplayArea.current.style.backgroundImage = `url(${reader.result})`;
                }
                reader.readAsDataURL(e.target.files[0]);
                console.log(res.data.path);
            }
            else{
                console.log(res);
            }
        })
        .catch((error)=>{
            image_upload_warn.current.style.visibility = error.status !== 200 ? 'visible' : 'hidden';
            console.log(error);
        })
    }

    function validateStreamInfo(){
        degree_name_warn.current.style.visibility = streamDetails.degreename ? 'hidden' : 'visible';
        stream_name_warn.current.style.visibility = streamDetails.streamname ? 'hidden' : 'visible';
        if(streamDetails.degreename && streamDetails.streamname){
            return true;
        }
        return false;
    }

    function saveStreamInfo(){
        if(!validateStreamInfo()){
            return;
        }
        Axios.post('http://localhost:3001/storestreams',streamDetails)
        .then(res => {
            response_message.current.style.visibility = res.status !== 200 ? 'visible' : 'hidden';
            if(res.status !== 200){
                response_message.current.innerHTML = "Something went wrong!";
                console.log(res);
            }
            else{
                getStreams();
                streamForm.current.reset();
                setAddStreamFieldVisible(false);
            }
        })
        .catch(error => {
            response_message.current.innerHTML = "Something went wrong!";
            response_message.current.style.visibility = error.status !== 200 ? 'visible' : 'hidden';
            console.log(error);
        })
    }
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
                    fetchedStreamDetails && fetchedStreamDetails.map((obj)=>(
                        <Stream key={obj._id} deptName={obj.streamname} subject_count={obj.subject_count} student_count={obj.student_count} RefImage={obj.RefImage}/>
                    ))
                }
            </main>
            <section style={{top:`${isAddstreamFieldVisible ? '6rem' : '-40rem'}`}} className={branchlistStyle.addStream}>
                <form onReset={()=>{refImageDisplayArea.current.style.backgroundImage = null}} ref={streamForm}>
                    <p ref={response_message} id='response_message' className={branchlistStyle.response_message}>Response</p>
                    <h1>Add Stream</h1>
                    <div className={branchlistStyle.input_fields}>
                        <label htmlFor="degree_name">Degree name</label>
                        <select onChange={(e)=>setStreamDetails({...streamDetails,degreename:e.target.value})} name="degree_name" id="degree_name">
                            <option value="">Select degree</option>
                            {
                                degreeNameArray.map((obj)=>(
                                    <option key={obj.id} value={obj.degree_name}>{obj.degree_name}</option>
                                ))
                            }
                        </select>
                        <p ref={degree_name_warn} className={branchlistStyle.degree_name_warn}>This field couldn't be empty!</p>
                    </div>
                    <div className={branchlistStyle.input_fields}>
                        <label htmlFor="stream_name">Stream name</label>
                        <input onChange={(e)=>setStreamDetails({...streamDetails,streamname:e.target.value})} id='stream_name' name='stream_name' type="text" placeholder='Enter the stream name'/>
                        <p ref={stream_name_warn} className={branchlistStyle.stream_name_warn}>This field couldn't be empty!</p>
                    </div>
                    <div className={branchlistStyle.input_fields}>
                        <p id='ref_image_display_area_label' className={branchlistStyle.ref_image_display_area_label}>Reference image</p>
                        <div ref={refImageDisplayArea} onClick={()=>refImageInputField.current.click()} className={branchlistStyle.ref_image_display_area}>
                            <input ref={refImageInputField} onChange={(e)=>setRefImage(e)} style={{display:'none'}} id='setRefImage' type="file" accept='image/*'/>
                            <span>
                                <img src={addIcon} alt="add" />
                                <p>Upload image</p>
                            </span>
                        </div>
                        <p ref={image_upload_warn} className={branchlistStyle.image_upload_warning}>Couldn't upload image!</p>
                    </div>
                    <button onClick={()=>saveStreamInfo()} type='button'>Save</button>
                </form>
            </section>
        </div>
    );
}
export default Branchlist;