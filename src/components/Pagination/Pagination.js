import React from 'react'
import './Pagination.css'

const Pagination = ({ totalPage, currentPage, requestPostsByPage }) => {

    let liArr = []
    let allPageArr = []
    let max = 10

    for(let i=0;i<totalPage;i++){
       allPageArr.push(i+1)
    }

    // 首先判断总页数 当总页数小于10时
    if(allPageArr.length <= max){  //[...allPageArr.slice(0,max-3),'…', ...allPageArr.slice(-2)] 
        liArr = allPageArr
    }else{

        // 当总页数大于10 当前页小于5时
        if( currentPage < 5 ){
            liArr = [...allPageArr.slice(0,5),'…', totalPage]
        }else{
             // 当总页数大于10 当前页小于 totalPage-4 时
            if(currentPage <= totalPage-4){
                liArr = [1, '…', ...allPageArr.slice(currentPage-2,currentPage+1),'…', totalPage]
            }else{ // 当总页数大于10 当前页大于 totalPage-5 时
                liArr = [1, '…', ...allPageArr.slice(totalPage-5, totalPage)]
            }
        }
    }

    return (
        <nav>
            <ul className="list-pages">
            <li className="list-pages-item" onClick={() => requestPostsByPage(currentPage-1)}>&lt;</li>
            { liArr.map( (v,index) => (
                <li className={ v !== '…' ? ( currentPage === v ? "list-pages-item list-pages-item-active": 'list-pages-item' ): '' } key={index} onClick={() => requestPostsByPage(v)}>
                    { v }
                </li>
            ))}
            <li className="list-pages-item" onClick={() => requestPostsByPage(currentPage+1)}>&gt;</li>
            </ul>
        </nav>
    )
}

export default Pagination