import React, { useEffect, useState } from 'react'
import Column from '../components/Column/Column';
import style from './page.module.css'
import displayIcon from '../icons/Display.svg'
import downIcon from '../icons/down.svg'




export default function Home() {
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(true);
    const [ordering,setOrdering]=useState("priority");
    const [grouping,setGrouping]=useState("status");
    const [groupedData,setGroupedData]=useState(null);
    console.log(groupedData)
    const fetchTasks=async ()=>{
        try {
            const response=await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result=await response.json();
            setData(result);
            console.log(result);
        } catch (error) {
            
        }finally{
            setLoading(false);
        }
    }
    function groupSort(tickets, groupBy, sortBy) {
        const groupedTickets = tickets.reduce((acc, ticket) => {
          const key = ticket[groupBy];
          if (!acc[key]) acc[key] = [];
          acc[key].push(ticket);
          return acc;
        }, {});
    
        for (const key in groupedTickets) {
          groupedTickets[key].sort((a, b) => {
            if (sortBy === "priority") {
              return a.priority - b.priority; // Sort by priority (ascending)
            } else if (sortBy === "title") {
              return a.title.localeCompare(b.title); // Sort by title (alphabetical order)
            }
          });
        }
        return groupedTickets;
      }
    useEffect(()=>{
        if(data){
            setGroupedData(groupSort(data["tickets"],grouping,ordering));   
        }
    },[data,ordering,grouping])
    useEffect(()=>{ 
        fetchTasks();
    },[]);

//dropdown code 

const [isOpen, setIsOpen] = useState(false);
const [isOpenGroup,setIsOpenGroup] = useState(false);
const [isOpenOrder,setIsOpenOrder] = useState(false);


  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdownGroup = () => {
    setIsOpenGroup(!isOpenGroup);
  };

  const toggleDropdownOrder = () => {
    setIsOpenOrder(!isOpenOrder);
  };




  return (
    <>
      {/* This div will always be displayed */}
      <div className={style.header}>
                
                <div className={style.dropdownContainer}>
          <button
            onClick={toggleDropdown}
            className={style.menuButton}
          >
            <img src={displayIcon} alt='display-icon'/> Display <img src={downIcon} alt='down-icon' />
          </button>    
          {isOpen && (
            <div className={style.menuList}>
              <div className={style.innerMenu}>
                {/* by grouping */}
                <div className={style.innerMenuItem}>
                <p>Grouping</p>
                <div className={style.dropdownContainerInner}>  
                <button
                    onClick={toggleDropdownGroup}
                    className={style.menuButtonInner}
                    >
                    {grouping} <img width="20px" src={downIcon} alt='down-icon' />
                </button>
                {isOpenGroup && (<div className={style.menuListInner}>
              <div className={style.innerMenuInner}>
                    <ul className={style.menuListInner}>
                        <li onClick={()=>{setGrouping("userId")}} className={style.menuItem}>User</li>
                        <li onClick={()=>{setGrouping("priority")}} className={style.menuItem}>Priority</li>
                        <li onClick={()=>{setGrouping("status")}} className={style.menuItem}>Status</li>
                    </ul>
                    </div>
                </div>
                )}
                </div>
                </div>
    
                {/* by ordering */}
                <div className={style.innerMenuItem}>
                <p>Ordering</p>
                <div className={style.dropdownContainerInner}>  
                <button
                    onClick={toggleDropdownOrder}
                    className={style.menuButtonInner}
                    >
                    {ordering} <img width="20px" src={downIcon} alt='down-icon' />
                </button>
                {isOpenOrder && (<div className={style.menuListInner}>
              <div className={style.innerMenuInner}>
                <div className={style.innerMenuItemInner}>
                <ul className={style.menuListInner}>
                        <li onClick={()=>{setOrdering("title")}} className={style.menuItem}>Title</li>
                        <li onClick={()=>{setOrdering("priority")}} className={style.menuItem}>Priority</li>
                    </ul>
                </div>
                </div>
                </div>
                )}
                </div>
                </div>
    
    
              </div>
            </div>
          )}
        </div>
        </div>
    
  
      {/* Conditional rendering logic remains the same */}
      {loading || !groupedData ? (
        <div>loading</div>
      ) : grouping === "status" ? (
        <div className={style.kanbanContainer}>
            <div className={style.kanbanBody}>
            {["Backlog", "Todo", "In Progress", "Done", "Cancelled"].map((ele) => (
                <Column key={ele} data={groupedData[ele]?groupedData[ele]:[]} title={ele} userData={data["users"]}/>
            ))}
            </div>
        </div>
      ) : grouping === "userId" ? (
        // Logic for userId grouping goes here if needed
        <div className={style.kanbanBody}>
          {/* Example logic */}
          {data["users"].map((ele) => (
            <Column key={ele["id"]} data={groupedData[ele["id"]]?groupedData[ele["id"]]:[]} title={ele["name"]} userData={data["users"]}/>
          ))}
        </div>
      ) : (
        <div className={style.kanbanBody}>
          {[{title:"No Priority",value:0},{title:"Urgent",value:4},{title:"High",value:3},{title:"Medium",value:2},{title:"Low",value:1}].map((val) => (
            <Column key={val.value} data={groupedData[val.value]?groupedData[val.value]:[]} title={val.title} userData={data["users"]}/>
          ))}
        </div>
      )}
    </>
  );  
}





            