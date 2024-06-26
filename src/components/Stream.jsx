import StreamStyle from './css/Stream.module.css';
import more_options_icon from '../assets/svg/Edit_Dept.svg';
import edit_icon from '../assets/svg/Edit_Symbol.svg';
import delete_icon from '../assets/svg/delete.svg';
import { useRef } from 'react';
import { useState } from 'react';
import Axios from 'axios';
function Stream({id,deptName,subject_count,student_count,RefImage,getStreams,setUpdateRequestId}){
    const more_options_button = useRef();
    const more_options_menu = useRef();
    const [show_more_options,set_show_more_options] = useState(false);

    function deleteStream(id){
        const _delete = window.confirm("Are you sure want to delete this stream?");
        if(!_delete){
            return;
        }
        Axios.delete(`http://localhost:3001/deletestream/${id}`)
        .then((res)=>{
            console.log(res);
            if(res.status === 200){
                getStreams();
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <section className={StreamStyle.stream_container} style={{backgroundImage:`url(${RefImage})`}}>
            <img onClick={()=>set_show_more_options(!show_more_options)} ref={more_options_button} className={StreamStyle.more_options_icon} src={more_options_icon} alt="more-options" />
            <ul ref={more_options_menu} id={`${show_more_options ? StreamStyle.display_more_options : ''}`} className={StreamStyle.more_options}>
                <li onClick={()=>{setUpdateRequestId(id)}} className={StreamStyle.edit_stream}><img src={edit_icon} alt="edit" />Edit Stream</li>
                <li onClick={()=>deleteStream(id)} className={StreamStyle.delete_stream}><img src={delete_icon} alt="delete" />Delete Stream</li>
            </ul>
            <div className={StreamStyle.stream_info}>
                <abbr title={deptName}>
                    <h1 className={StreamStyle.stream_name}>{deptName}</h1>
                </abbr>
                <div className={StreamStyle.counts}>
                    <p className={StreamStyle.students_count}><span>Students Count : </span>{student_count}</p>
                    <p className={StreamStyle.subjects_count}><span>Subjects Count : </span>{subject_count}</p>
                </div>
            </div>
        </section>
    )
}
export default Stream;