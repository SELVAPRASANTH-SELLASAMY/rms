import branchlistStyle from './css/branchlist.module.css';
import addIcon from '../assets/svg/add.svg';
import { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
function Addstream({getStreams,setAddStreamFieldVisible,isAddstreamFieldVisible,updateRequestId,fetchedStreamDetails,streamForm}){
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

    const refImageInputField = useRef();
    const refImageDisplayArea = useRef();
    const image_upload_warn  = useRef();
    const response_message = useRef();
    const degree_name_warn = useRef();
    const stream_name_warn = useRef();

    const [streamDetails,setStreamDetails] = useState({
        degreename : '',
        streamname : '',
        RefImage : null
    });
    const [beforeUpdate,setBeforeUpdate] = useState({
        degreeName :'',
        streamname : '',
        RefImage : null
    });

    function onUpdateRequest(){
        if(updateRequestId){
            fetchedStreamDetails.forEach((obj)=>{
                if(obj._id === updateRequestId){
                    setStreamDetails({
                        degreename : obj.degreename,
                        streamname : obj.streamname,
                        RefImage : obj.RefImage
                    })
                    setBeforeUpdate({
                        degreename : obj.degreename,
                        streamname : obj.streamname,
                        RefImage : obj.RefImage
                    })
                    setAddStreamFieldVisible(true);
                    console.log(streamDetails);
                }
            })
        }
        else{
            setStreamDetails({
                degreename : '',
                streamname : '',
                RefImage : null
            })
        }
    }

    function saveStreamInfo(){
        if(!validateStreamInfo()){
            return;
        }
        const formData = new FormData();
        Object.keys(streamDetails).forEach((key)=>{
            formData.append(key,streamDetails[key]);
        });
        Axios.post('http://localhost:3001/storestreams',formData)
        .then(res => {
            response_message.current.style.visibility = res.status !== 200 ? 'visible' : 'hidden';
            if(res.status !== 200){
                response_message.current.innerHTML = "Something went wrong!";
                console.log(res);
            }
            else{
                getStreams();
                onUpdateRequest();
                streamForm.current.reset();
                setStreamDetails({...streamDetails,RefImage:res.data.path});
                setAddStreamFieldVisible(false);
            }
        })
        .catch(error => {
            response_message.current.innerHTML = "Something went wrong!";
            response_message.current.style.visibility = error.status !== 200 ? 'visible' : 'hidden';
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
    function handleFormReset(){
        refImageDisplayArea.current.style.backgroundImage = null;
        degree_name_warn.current.style.visibility = 'hidden';
        stream_name_warn.current.style.visibility = 'hidden';
    }
    function cancelAddStream(){
        streamForm.current.reset();
        setAddStreamFieldVisible(false);
    }
    function updateStreamInfo(){
        if(JSON.stringify(streamDetails) !== JSON.stringify(beforeUpdate)){
            var newstreamDetails = {...streamDetails,id:updateRequestId};
            const formData = new FormData();
            Object.keys(newstreamDetails).forEach((key)=>{
                formData.append(key,newstreamDetails[key]);
            });
            Axios.put('http://localhost:3001/updatestream',formData)
            .then((res)=>{
                console.log(res);
                if(res.status === 200){
                    getStreams();
                    streamForm.current.reset();
                    setAddStreamFieldVisible(false);
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }

    function handleImageInputChange(e){
        setStreamDetails({...streamDetails,RefImage:e.target.files[0]});
        const reader = new FileReader();
        reader.onloadend = () => {
            refImageDisplayArea.current.style.backgroundImage = `url(${reader.result})`;
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(()=>{
        onUpdateRequest();
    },[updateRequestId])

    return(
        <section style={{top:`${isAddstreamFieldVisible ? '6rem' : '-40rem'}`}} className={branchlistStyle.addStream}>
            <form onReset={()=>handleFormReset()} ref={streamForm}>
                <p ref={response_message} id='response_message' className={branchlistStyle.response_message}>Response</p>
                <h1>Add Stream</h1>
                <div className={branchlistStyle.input_fields}>
                    <label htmlFor="degree_name">Degree name</label>
                    <select value={streamDetails.degreename} onChange={(e)=>setStreamDetails({...streamDetails,degreename:e.target.value})} name="degree_name" id="degree_name">
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
                    <input value={streamDetails.streamname} onChange={(e)=>setStreamDetails({...streamDetails,streamname:e.target.value})} id='stream_name' name='stream_name' type="text" placeholder='Enter the stream name'/>
                    <p ref={stream_name_warn} className={branchlistStyle.stream_name_warn}>This field couldn't be empty!</p>
                </div>
                <div className={branchlistStyle.input_fields}>
                    <p id='ref_image_display_area_label' className={branchlistStyle.ref_image_display_area_label}>Reference image</p>
                    <div ref={refImageDisplayArea} style={{backgroundImage:streamDetails.RefImage ? `url(${streamDetails.RefImage})` : ''}} onClick={()=>refImageInputField.current.click()} className={branchlistStyle.ref_image_display_area}>
                        <input ref={refImageInputField} onChange={(e)=>handleImageInputChange(e)} style={{display:'none'}} id='setRefImage' type="file" accept='image/*'/>
                        <span>
                            <img src={addIcon} alt="add" />
                            <p>Upload image</p>
                        </span>
                    </div>
                    <p ref={image_upload_warn} className={branchlistStyle.image_upload_warning}>Couldn't upload image!</p>
                </div>
                <div className={branchlistStyle.buttons}>
                    <button onClick={()=>cancelAddStream()} type='button'>cancel</button>
                    <button onClick={()=>{!updateRequestId ? saveStreamInfo() : updateStreamInfo();}} type='button'>Save</button>
                </div>
            </form>
        </section>
    )
}
export default Addstream;