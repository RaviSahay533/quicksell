import React from 'react'
import Card from '../Card/Card';
import style from './column.module.css'
import threeDot from '../../icons/threeDot.svg'
import addIcon from '../../icons/add.svg'
import backlogIcon from '../../icons/Backlog.svg';
import cancelledIcon from '../../icons/Cancelled.svg';
import doneIcon from '../../icons/Done.svg';
import todoIcon from '../../icons/To-do.svg';
import inprogressIcon from '../../icons/in-progress.svg';
import highPriorityIcon from '../../icons/highPriority.svg'
import mediumPriorityIcon from '../../icons/mediumPriority.svg';
import lowPriorityIcon from '../../icons/LowPriority.svg';
import noPriorityIcon from '../../icons/No-priority.svg';
import urgentIcon from '../../icons/urgent.svg';

export default function Column({data,title,userData}) {
  console.log(data);
  return (
    <>

    <div className={style.columnContainer}>
    
    <div className={style.columnHeader}>
    <div style={{display:'flex',gap:'1em'}}>
    {
      title == 'Backlog'?<img src={backlogIcon} alt='backlog-icon' />
      : title == 'Todo' ? <img src={todoIcon} alt='todo-icon' />
      : title == 'In Progress'? <img src={inprogressIcon} alt='todo-icon' />
      : title == 'Done' ? <img src={doneIcon} alt='todo-icon' />
      : title == 'Cancelled'?<img src={cancelledIcon} alt='cancelled-icon'/>
      : title == 'High'? <img src={highPriorityIcon} alt ='high-priority-icon' />
      : title == 'Medium'? <img src={mediumPriorityIcon} alt='medium-priority-icons' />
      : title == 'Low'? <img src={lowPriorityIcon} alt='low-priority-icons' />
      : title == 'No Priority' ? <img src={noPriorityIcon} alt='no-priority-icons' />
      : title == 'Urgent' ? <img src={urgentIcon} alt='urgent-priority-icons' />
      :""
    } 
      <p>{title}</p> 
      <p>{data.length}</p>
      </div> 
      <div style={{display:'flex',alignItems:'center'}}>
        <img src={addIcon} alt='add'/>
        <img src={threeDot} alt='threeDot' />
      </div>
      </div>

      <div className={style.columnBody} >
      {
      data.map((ele)=>{
        return (
          <Card key={ele.id} cardData={ele} userData={userData}/>
        )
      })
    }
      </div>

    </div>

    {/* */}
    </>
    
  )
}
